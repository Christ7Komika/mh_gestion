"use client";
import React, { useEffect, useState } from "react";
import SelectLabel from "../../input/SelectLabel";
import InputDateTime from "../../input/InputDateTime";
import InputFile from "../../input/InputFile";
import TextArea from "../../input/TextArea";
import useSWR from "swr";
import { host } from "@/lib/host";
import LoaderSpinner from "../../loader/LoaderSpinner";
import { EmployeeName } from "@/types/employee";
import toast, { Toaster } from "react-hot-toast";
import { GetSanctions } from "@/types/sanction";
import { isExpired } from "@/lib/helpers";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddSanctionModal = ({ handleClose }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [motif, setMotif] = useState<string>("");
  const [employee, setEmployee] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR<EmployeeName>(`${host}/employee`, fetcher);
  const [nameList, setNameList] = useState<string[]>([]);
  const [id, setId] = useState<string>("");
  const { data: sanctions, mutate } = useSWR<GetSanctions>(
    `${host}/sanction`,
    fetcher
  );

  useEffect(() => {
    if (data)
      setNameList([
        ...data.employees.map(
          (employeeValue) =>
            `${employeeValue.firstName} ${employeeValue.lastName}`
        ),
      ]);
  }, [data]);

  useEffect(() => {
    if (employee === "inconnu") {
      setId("");
    }
    if (data && employee !== "inconnu") {
      const v = data.employees.find((employeeValue) => {
        const value = `${employeeValue.firstName} ${employeeValue.lastName}`;
        if (value === employee) {
          return employeeValue;
        }
      });

      setId(v?.id as string);
    }
  }, [employee]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (!id) {
      return toast.error("Veuillez selectionner le nom de l'employé.");
    }

    if (file) {
      formData.append("file", file);
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return toast.error(
        "La date de début ne peux pas etre superieur a la date de fin"
      );
    }

    if (startDate) {
      formData.append("startDate", startDate);
    }

    if (endDate) {
      formData.append("endDate", endDate);
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return toast.error(
        "La date de début ne peux pas etre superieur a la date de fin"
      );
    }

    const expired = sanctions?.data.find(
      (sanction) =>
        sanction.employeeId === id &&
        sanction.endDate &&
        !isExpired(sanction.endDate)
    );

    if (endDate && expired && !isExpired(endDate)) {
      return toast.error(
        "Oups, vous ne pouvez pas avoir deux sanctions en cour d'utilisation."
      );
    }

    formData.append("employeeId", id);
    formData.append("motif", motif);

    setIsLoad(true);
    const res = await fetch(`${host}/sanction`, {
      method: "POST",
      redirect: "follow",
      body: formData,
    });

    if (res.ok) {
      mutate();
      setIsLoad(false);
      handleClose(false);
      return;
    }
    setIsLoad(false);
    return;
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0  bg-slate-200 flex justify-center items-center backdrop-blur bg-opacity-25 z-30">
      <Toaster />
      <form className="w-auto rounded bg-white shadow p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold uppercase text-slate-600">
            Nouvelle sanction
          </h2>
          <span
            className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
            onClick={() => handleClose(false)}
          ></span>
        </div>
        <div className="flex gap-4 w-full">
          {isLoading ? (
            <div className="flex h-10 justify-center items-center">
              <LoaderSpinner w={25} h={25} color="#222" />
            </div>
          ) : (
            <SelectLabel
              data={nameList}
              label="Employée"
              value={employee}
              setValue={setEmployee}
            />
          )}
        </div>

        <div className="flex gap-4">
          <InputFile label="Sanction" setValue={setFile} />
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
            label="Motif de la sanction"
            value={motif}
            setValue={setMotif}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="w-32 h-10 flex justify-center items-center bg-emerald-400 text-emerald-900 rounded text-sm font-medium"
            onClick={handleSubmit}
          >
            {isLoad ? <LoaderSpinner w={15} h={15} color="#fff" /> : "Valider"}
          </button>
        </div>
      </form>
    </div>
  );
};

const employees = ["Christ Komika", "Mark Atanas", "Kevin Malonga"];

export default AddSanctionModal;
