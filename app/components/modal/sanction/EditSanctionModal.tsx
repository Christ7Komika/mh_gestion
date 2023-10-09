"use client";

import React, { useState } from "react";
import InputText from "../../input/InputText";
import SelectLabel from "../../input/SelectLabel";
import InputDateTime from "../../input/InputDateTime";
import InputFile from "../../input/InputFile";
import TextArea from "../../input/TextArea";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditSectionModal = ({ handleClose }: Props) => {
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [contractType, setContractType] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [employee, setEmployee] = useState<string>("");

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
        <div className="flex gap-4">
          <InputText label="Nom" value={name} setValue={setName} />
        </div>
        <div className="flex gap-4 w-full">
          <SelectLabel
            data={employees}
            label="Employée"
            value={employee}
            setValue={setEmployee}
          />
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
          <InputText
            label="Date de fin"
            value={endDate}
            setValue={setEndDate}
          />
        </div>
        <div className="flex gap-4">
          <TextArea label="Poste" value={comment} setValue={setComment} />
        </div>
        <div className="flex justify-end">
          <button className="w-32 h-10 flex justify-center items-center bg-emerald-400 text-emerald-900 rounded text-sm font-medium">
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};

const contract = ["CDD", "CDI", "Stage", "Prestation"];
const employees = ["Christ Komika", "Mark Atanas", "Kevin Malonga"];

export default EditSectionModal;
