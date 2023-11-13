"use client";

import React, { useEffect, useState } from "react";
import SelectLabel from "../../input/SelectLabel";
import InputDateTime from "../../input/InputDateTime";
import InputFile from "../../input/InputFile";
import TextArea from "../../input/TextArea";
import { host } from "@/lib/host";
import useSWR, { KeyedMutator } from "swr";
import toast, { Toaster } from "react-hot-toast";
import LoaderSpinner from "../../loader/LoaderSpinner";
import { Employee } from "@/types/api/employee";
import { Categories } from "@/types/api/categorie";
import { isExpired } from "@/lib/helpers";

interface Documents {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  otherDocumentType: {
    id: string;
    name: string;
  };
  otherDocumentTypeId: string;
}

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  mutate: KeyedMutator<Employee>;
  mutateCategories: KeyedMutator<Categories[]>;
}

type Category = { name: string; id: string };

const AddDocumentModal = ({
  handleClose,
  id,
  mutate,
  mutateCategories,
}: Props) => {
  const [type, setType] = useState<string>("inconnu");
  const [file, setFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const [documentType, setDocumentType] = useState<string[] | []>([]);
  const [load, setLoad] = useState<boolean>(false);
  const { data, isLoading } = useSWR<Category[]>(`${host}/category`, fetcher);
  const { data: documents } = useSWR<Documents[]>(
    `${host}/document/${id}`,
    fetcher
  );

  console.log({ document });

  useEffect(() => {
    if (data) {
      setDocumentType(data.map((v) => v.name));
    }
  }, [data]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (type === "inconnu") {
      toast.error("Veuillez selectionner le type de document");
      return;
    }

    if (!file) {
      toast.error("Veuillez ajouter un document (pdf/word/image)");
      return;
    }

    if (endDate && !startDate) {
      return toast.error(
        "Vous ne pouvez pas inserer un date de fin sans avoir insérer la date de début"
      );
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return toast.error(
        "La date de début ne peux pas etre superieur a la date de fin"
      );
    }

    const expired = documents?.find(
      (document) =>
        document.endDate &&
        document.otherDocumentType.name === type &&
        !isExpired(document.endDate)
    );

    if (endDate && !isExpired(endDate) && expired) {
      return toast.error(
        "Oups, vous ne pouvez pas avoir deux " +
          type.toLowerCase() +
          " en cour d'execution."
      );
    }

    const documentId = data?.find((v) => v.name === type)?.id;
    const submitDdata = new FormData();
    submitDdata.append("documentNameId", documentId as string);
    submitDdata.append("employeeId", id);
    submitDdata.append("document", file as File);
    submitDdata.append("startDate", startDate);
    submitDdata.append("endDate", endDate);
    submitDdata.append("comment", comment);

    setLoad(true);
    fetch(`${host}/document`, {
      method: "POST",
      body: submitDdata,
    })
      .then(() => {
        mutate();
        mutateCategories();
        setLoad(false);
        handleClose(false);
      })
      .catch(() => {
        setLoad(false);
      });
  };

  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0  bg-slate-200 flex justify-center items-center backdrop-blur bg-opacity-25 z-30 p-4">
        <form className="w-full rounded bg-white shadow p-4 flex flex-col gap-4 max-w-[500px]">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold uppercase text-slate-600">
              Ajouter un document
            </h2>
            <span
              className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
              onClick={() => handleClose(false)}
            ></span>
          </div>
          <div className="flex gap-4">
            {documentType && isLoading ? (
              <LoaderSpinner w={15} h={15} color="#222" />
            ) : (
              <SelectLabel
                data={documentType}
                label="Type de document"
                value={type}
                setValue={setType}
              />
            )}
          </div>
          <div className="flex gap-4">
            <InputFile label="Document" setValue={setFile} />
          </div>

          <div className="flex gap-4">
            <InputDateTime
              label="Date de début"
              value={startDate}
              setValue={setStartDate}
            />
            <InputDateTime
              label="Date de fin"
              value={endDate}
              setValue={setEndDate}
            />
          </div>
          <div className="flex gap-4">
            <TextArea
              label="Commentaire"
              value={comment}
              setValue={setComment}
            />
          </div>
          <div className="flex justify-end">
            {isLoading ? (
              <button className="w-32 h-10 flex justify-center items-center bg-gray-300 text-gray-500 rounded text-sm font-medium"></button>
            ) : (
              <button
                className="w-32 h-10 flex justify-center items-center bg-emerald-400 text-white rounded text-sm font-medium cursor-pointer"
                onClick={handleSubmit}
              >
                {load ? <LoaderSpinner /> : "Valider"}
              </button>
            )}
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default AddDocumentModal;
