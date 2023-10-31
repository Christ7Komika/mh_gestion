"use client";

import React, { useEffect, useState } from "react";
import SelectLabel from "../../input/SelectLabel";
import InputDateTime from "../../input/InputDateTime";
import InputFile from "../../input/InputFile";
import TextArea from "../../input/TextArea";
import { EmployeeName } from "@/types/employee";
import { host } from "@/lib/host";
import useSWR from "swr";
import LoaderSpinner from "../../loader/LoaderSpinner";
import { Sanction } from "@/types/sanction";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  idSanction: string;
}

const EditSectionModal = ({ handleClose, idSanction }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [motif, setMotif] = useState<string>("");
  const [employee, setEmployee] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading: isLoadEmployees } = useSWR<EmployeeName>(
    `${host}/employee`,
    fetcher
  );
  const [nameList, setNameList] = useState<string[]>([]);
  const [id, setId] = useState<string>("");
  const { mutate } = useSWR(`${host}/sanction`);
  const { data: sanction, isLoading: isLoadSanction } = useSWR<Sanction>(
    `${host}/sanction/${idSanction}`,
    fetcher
  );

  useEffect(() => {
    if (sanction?.startDate) {
      setStartDate(sanction?.startDate);
    }
    if (sanction?.endDate) {
      setEndDate(sanction?.endDate);
    }
    if (sanction?.motif) {
      setMotif(sanction.motif);
    }
  }, [sanction]);

  useEffect(() => {
    if (data)
      setNameList([
        ...data.employees.map(
          (employeeValue) =>
            `${employeeValue.firstName} ${employeeValue.lastName}`
        ),
      ]);
  }, [data]);

  console.log({
    startDate: startDate,
    endDate: endDate,
  });

  useEffect(() => {
    if (sanction && data) {
      const res = data?.employees.find(
        (employeeName) => employeeName.id === sanction?.employeeId
      );
      if (res) {
        setEmployee(`${res.firstName} ${res.lastName}`);
      }
    }
  }, [sanction, data, nameList]);

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
    formData.append("employeeId", id);
    if (file) {
      formData.append("file", file);
    }
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("motif", motif);

    setIsLoad(true);
    const res = await fetch(`${host}/sanction/${idSanction}`, {
      method: "PUT",
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
      <form className="w-auto rounded bg-white shadow p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold uppercase text-slate-600">
            Modifier la sanction
          </h2>
          <span
            className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
            onClick={() => handleClose(false)}
          ></span>
        </div>
        <div className="flex gap-4 w-full">
          {isLoadEmployees ? (
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
          <InputFile label="Contrat" setValue={setFile} />
        </div>

        <div className="flex gap-4">
          {isLoadSanction ? (
            <div className="flex h-10 justify-center items-center">
              <LoaderSpinner w={25} h={25} color="#222" />
            </div>
          ) : (
            <InputDateTime
              label="Date de début"
              value={startDate}
              setValue={setStartDate}
            />
          )}

          {isLoadSanction ? (
            <div className="flex h-10 justify-center items-center">
              <LoaderSpinner w={25} h={25} color="#222" />
            </div>
          ) : (
            <InputDateTime
              label="Date de fin"
              value={endDate}
              setValue={setEndDate}
            />
          )}
        </div>
        <div className="flex gap-4">
          {isLoadSanction ? (
            <div className="flex h-10 justify-center items-center">
              <LoaderSpinner w={25} h={25} color="#222" />
            </div>
          ) : (
            <TextArea label="Motif" value={motif} setValue={setMotif} />
          )}
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

const contract = ["CDD", "CDI", "Stage", "Prestation"];
const employees = ["Christ Komika", "Mark Atanas", "Kevin Malonga"];

export default EditSectionModal;
