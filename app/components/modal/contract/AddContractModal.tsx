"use client";
import React, { useEffect, useState } from "react";
import SelectLabel from "../../input/SelectLabel";
import InputDateTime from "../../input/InputDateTime";
import InputFile from "../../input/InputFile";
import useSWR from "swr";
import { host } from "@/lib/host";
import { EmployeeName } from "@/types/employee";
import toast, { Toaster } from "react-hot-toast";
import LoaderSpinner from "../../loader/LoaderSpinner";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddContractModal = ({ handleClose }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [contractType, setContractType] = useState<string>("inconnu");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [employee, setEmployee] = useState<string>("inconnu");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR<EmployeeName>(`${host}/employee`, fetcher);
  const [nameList, setNameList] = useState<string[]>([]);
  const [id, setId] = useState<string>("");
  const { mutate } = useSWR(`${host}/contract`);

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
    if (!id) {
      return toast.error("Veuillez selectionner le nom de l'employé.");
    }

    if (!file) {
      return toast.error("Veuillez inserer un document (le contrat).");
    }

    if (contractType === "inconnu") {
      return toast.error("Veuillez selectionner le type de contrat.");
    }

    if (!startDate) {
      return toast.error("Veuillez inserer la date du début de contrat.");
    }
    if (contractType !== "CDI" && !endDate) {
      return toast.error("Veuillez inserer la date de fin de contrat.");
    }
    const formData = new FormData();
    formData.append("employeeId", id);
    formData.append("file", file);
    formData.append("type", contractType);
    formData.append("startDate", startDate);
    if (contractType === "CDI") {
      formData.append("endDate", "inconnu");
    } else {
      formData.append("endDate", endDate);
    }

    setIsLoad(true);
    const res = await fetch(`${host}/contract`, {
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
            Nouveau contrat
          </h2>
          <span
            className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
            onClick={() => handleClose(false)}
          ></span>
        </div>
        <div className="flex gap-4 w-full">
          {isLoading ? (
            <LoaderSpinner w={25} h={25} />
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
          <InputFile label="Contrat" setValue={setFile} />
        </div>
        <div className="flex gap-4 w-full">
          <SelectLabel
            data={contract}
            label="Type de contrat"
            value={contractType}
            setValue={setContractType}
          />
        </div>

        <div className="flex gap-4">
          <InputDateTime
            label="Date de début"
            value={startDate}
            setValue={setStartDate}
          />
          {!(contractType === "CDI") && (
            <InputDateTime
              label="Date de fin"
              value={endDate}
              setValue={setEndDate}
            />
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className=" text-white w-32 h-10 flex justify-center items-center bg-emerald-400  rounded text-sm font-medium"
            onClick={handleSubmit}
          >
            {isLoad ? <LoaderSpinner w={15} h={15} color="#fff" /> : "Valider"}
          </button>
        </div>
      </form>
    </div>
  );
};

const contract = ["CDD", "CDI", "Stage", "Prestation"];
const employees = ["Christ Komika", "Mark Atanas", "Kevin Malonga"];

export default AddContractModal;
