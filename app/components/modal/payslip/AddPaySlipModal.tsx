"use client";
import React, { useEffect, useState } from "react";
import InputText from "../../input/InputText";
import SelectLabel from "../../input/SelectLabel";
import InputDateTime from "../../input/InputDateTime";
import InputFile from "../../input/InputFile";
import TextArea from "../../input/TextArea";
import { EmployeeName } from "@/types/employee";
import useSWR from "swr";
import { host } from "@/lib/host";
import toast, { Toaster } from "react-hot-toast";
import LoaderSpinner from "../../loader/LoaderSpinner";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPaySlipModal = ({ handleClose }: Props) => {
  const [salary, setSalary] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [payementDate, setPaymentDate] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [employee, setEmployee] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR<EmployeeName>(`${host}/employee`, fetcher);
  const [nameList, setNameList] = useState<string[]>([]);
  const [id, setId] = useState<string>("");
  const { mutate } = useSWR(`${host}/payslip`);

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

    if (!file) {
      return toast.error("Veuillez ajouter un document.");
    }

    if (!payementDate) {
      return toast.error("Veuillez ajouter la dare de payement.");
    }
    if (!salary) {
      return toast.error("Veuillez ajouter le salaire.");
    }

    formData.append("employeeId", id);
    formData.append("comment", comment);
    formData.append("file", file);
    formData.append("payementDate", payementDate);
    formData.append("salary", salary);

    setIsLoad(true);
    const res = await fetch(`${host}/payslip`, {
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
      <form className=" w-96 rounded bg-white shadow p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold uppercase text-slate-600">
            Nouveau Bulletin de paie
          </h2>
          <span
            className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
            onClick={() => handleClose(false)}
          ></span>
        </div>
        <div className="flex gap-4">
          <InputText label="Somme" value={salary} setValue={setSalary} />
        </div>
        <div className="flex gap-4 w-full items-center">
          {isLoading ? (
            <LoaderSpinner w={20} h={20} color="#222" />
          ) : (
            <SelectLabel
              data={nameList}
              label="Employée"
              value={employee}
              setValue={setEmployee}
            />
          )}
          <InputDateTime
            label="Date de payment"
            value={payementDate}
            setValue={setPaymentDate}
          />
        </div>
        <div className="flex gap-4">
          <InputFile label="Bulletin de paie" setValue={setFile} />
        </div>

        <div className="flex gap-4">
          <TextArea label="Commentaire" value={comment} setValue={setComment} />
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

export default AddPaySlipModal;
