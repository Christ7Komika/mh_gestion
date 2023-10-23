"use client";

import React, { useEffect, useState } from "react";
import SelectLabel from "../../input/SelectLabel";
import InputDateTime from "../../input/InputDateTime";
import InputFile from "../../input/InputFile";
import TextArea from "../../input/TextArea";
import { host } from "@/lib/host";
import useSWR from "swr";
import toast, { Toaster } from "react-hot-toast";
import LoaderSpinner from "../../loader/LoaderSpinner";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

type Category = { name: string; id: string };

const AddDocumentModal = ({ handleClose, id }: Props) => {
  const [type, setType] = useState<string>("inconnu");
  const [file, setFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [isContractFile, setIsContractFile] = useState<boolean>(false);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const [documentType, setDocumentType] = useState<string[] | []>([]);
  const [load, setLoad] = useState<boolean>(false);
  const { data } = useSWR<Category[]>(`${host}/category`, fetcher);

  useEffect(() => {
    if (data) {
      setDocumentType(data.map((v) => v.name));
    }
  }, [data]);

  useEffect(() => {
    if (type === "Contrat") {
      setIsContractFile(true);
    } else {
      setIsContractFile(false);
    }
  }, [type]);

  console.log(type, isContractFile);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (type === "inconnu") {
      toast.error("Veuillez selectionner le type de document");
    }

    if (!file) {
      toast.error("Veuillez ajouter un document (pdf/word/image)");
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
        setLoad(false);
      })
      .catch(() => {
        setLoad(false);
      });
  };

  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0  bg-slate-200 flex justify-center items-center backdrop-blur bg-opacity-25 z-30">
        <form className="w-auto rounded bg-white shadow p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold uppercase text-slate-600">
              Nouvel employé
            </h2>
            <span
              className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
              onClick={() => handleClose(false)}
            ></span>
          </div>
          <div className="flex gap-4">
            {documentType && (
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
            <button
              className="w-32 h-10 flex justify-center items-center bg-emerald-400 text-emerald-900 rounded text-sm font-medium"
              onClick={handleSubmit}
            >
              {load ? <LoaderSpinner /> : "Valider"}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
};

const contract = ["CDD", "CDI", "Stage", "Prestation"];

export default AddDocumentModal;
