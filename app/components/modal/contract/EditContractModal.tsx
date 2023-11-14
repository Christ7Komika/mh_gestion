"use client";
import React, { useEffect, useState } from "react";
import SelectLabel from "../../input/SelectLabel";
import InputDateTime from "../../input/InputDateTime";
import InputFile from "../../input/InputFile";
import { host } from "@/lib/host";
import useSWR from "swr";
import { Contract } from "@/types/contract";
import { EmployeeName } from "@/types/employee";
import LoaderSpinner from "../../loader/LoaderSpinner";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const EditContractModal = ({ handleClose, id }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [contractType, setContractType] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [employee, setEmployee] = useState<string>("");
  const [isCDI, setIsCDI] = useState(false);
  const [employeeId, setEmployeeId] = useState<string>("");
  const [nameList, setNameList] = useState<string[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: contract } = useSWR<Contract>(
    `${host}/contract/${id}`,
    fetcher
  );
  const { data: employees, isLoading } = useSWR<EmployeeName>(
    `${host}/employee/`,
    fetcher
  );

  const { mutate } = useSWR(`${host}/contract`);

  useEffect(() => {
    if (employees)
      setNameList([
        ...employees.employees.map(
          (employeeValue) =>
            `${employeeValue.firstName} ${employeeValue.lastName}`
        ),
      ]);
  }, [employees]);

  useEffect(() => {
    if (employee === "inconnu") {
      setEmployeeId("");
    }
    if (employees && employee !== "inconnu") {
      const v = employees.employees.find((employeeValue) => {
        const value = `${employeeValue.firstName} ${employeeValue.lastName}`;
        if (value === employee) {
          return employeeValue;
        }
      });

      setEmployeeId(v?.id as string);
    }
  }, [employee]);

  useEffect(() => {
    if (contract) {
      setContractType(contract.type);
      setStartDate(contract.startDate);
      setEmployeeId(contract.employee.id);

      if (contract.endDate !== "inconnu") {
        setEndDate(contract.endDate);
      }
    }
  }, [contract]);

  // Get the current id
  useEffect(() => {
    if (contract && employees) {
      const res = employees?.employees.find(
        (employeeName) => employeeName.id === contract.employee.id
      );
      if (res) {
        setEmployee(`${res.firstName} ${res.lastName}`);
      }
    }
  }, [contract, employees]);

  useEffect(() => {
    if (contractType === "CDI") {
      setIsCDI(true);
    } else {
      setIsCDI(false);
    }
  }, [contractType]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    if (endDate) {
      formData.append("endDate", endDate);
    }
    formData.append("employeeId", employeeId);
    formData.append("type", contractType);
    formData.append("startDate", startDate);
    setIsLoad(true);
    const res = await fetch(`${host}/contract/${id}`, {
      method: "PUT",
      body: formData,
      referrer: "follow",
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
            Modifier le contrat
          </h2>
          <span
            className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
            onClick={() => handleClose(false)}
          ></span>
        </div>

        <div className="flex gap-4 w-full justify-center">
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
            data={contractTypes}
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
          {!isCDI && (
            <InputDateTime
              label="Date de fin"
              value={endDate}
              setValue={setEndDate}
            />
          )}
        </div>
        <div className="flex justify-end">
          <button
            className="w-32 h-10 flex justify-center items-center bg-emerald-400 text-emerald-900 rounded text-sm font-medium"
            onClick={handleSubmit}
          >
            {isLoad ? <LoaderSpinner /> : "Valider"}
          </button>
        </div>
      </form>
    </div>
  );
};

const contractTypes = ["CDD", "CDI", "Stage", "Prestation"];

export default EditContractModal;
