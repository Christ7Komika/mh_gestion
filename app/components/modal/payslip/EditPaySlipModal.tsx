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
import { PaySlip } from "@/types/payslip";
import InputText from "../../input/InputText";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  idPayslip: string;
}

const EditPaySlipModal = ({ handleClose, idPayslip }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [paymentDate, setPaymentDate] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [employee, setEmployee] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR<EmployeeName>(`${host}/employee`, fetcher);
  const [nameList, setNameList] = useState<string[]>([]);
  const [id, setId] = useState<string>("");
  const { mutate } = useSWR(`${host}/payslip`);
  const { data: payslip, isLoading: isLoadPayslip } = useSWR<PaySlip>(
    `${host}/payslip/${idPayslip}`,
    fetcher
  );

  useEffect(() => {
    if (payslip?.payementDate) {
      setPaymentDate(payslip.payementDate);
    }
    if (payslip?.comment) {
      setComment(payslip?.comment);
    }
    if (payslip?.salary) {
      setSalary(payslip.salary);
    }
  }, [payslip]);

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
    if (payslip && data) {
      const res = data?.employees.find(
        (employeeName) => employeeName.id === payslip?.employeeId
      );
      if (res) {
        setEmployee(`${res.firstName} ${res.lastName}`);
      }
    }
  }, [payslip, data, nameList]);

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
    formData.append("payementDate", paymentDate);
    formData.append("salary", salary);
    formData.append("comment", comment);

    setIsLoad(true);
    const res = await fetch(`${host}/payslip/${idPayslip}`, {
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
            Modifier le bulletin de paie
          </h2>
          <span
            className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
            onClick={() => handleClose(false)}
          ></span>
        </div>
        <div className="flex gap-4 w-full">
          {isLoadPayslip ? (
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
          {isLoadPayslip ? (
            <div className="flex h-10 justify-center items-center">
              <LoaderSpinner w={25} h={25} color="#222" />
            </div>
          ) : (
            <InputText label="Salaire" value={salary} setValue={setSalary} />
          )}

          {isLoadPayslip ? (
            <div className="flex h-10 justify-center items-center">
              <LoaderSpinner w={25} h={25} color="#222" />
            </div>
          ) : (
            <InputDateTime
              label="Date de payement"
              value={paymentDate}
              setValue={setPaymentDate}
            />
          )}
        </div>
        <div className="flex gap-4">
          {isLoadPayslip ? (
            <div className="flex h-10 justify-center items-center">
              <LoaderSpinner w={25} h={25} color="#222" />
            </div>
          ) : (
            <TextArea
              label="Commentaire"
              value={comment}
              setValue={setComment}
            />
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

export default EditPaySlipModal;
