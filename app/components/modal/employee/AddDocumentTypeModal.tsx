"use client";
import React, { useState } from "react";
import InputText from "../../input/InputText";
import { IoAddOutline } from "react-icons/io5";
import { host } from "@/lib/host";
import LoaderSpinner from "../../loader/LoaderSpinner";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddDocumentModal = ({ handleClose }: Props) => {
  const [name, setName] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoad(true);
    fetch(`${host}/category`, {
      method: "POST",
      body: JSON.stringify({ name: name }),
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setIsLoad(false);
        handleClose(false);
        return;
      })
      .catch(() => {
        setIsLoad(false);
        return;
      });
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0  bg-slate-200 flex justify-center items-center backdrop-blur bg-opacity-25 z-30">
      <form className="w-auto rounded bg-white shadow p-4 flex flex-col gap-4 min-w-[400px]">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold uppercase text-slate-600">
            Ajouter une catégorie
          </h2>
          <span
            className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
            onClick={() => handleClose(false)}
          ></span>
        </div>
        <div className="flex gap-4 items-center">
          <InputText
            label=""
            placeholder="Nom du document"
            value={name}
            setValue={setName}
          />
          <button
            className="w-10 h-9 flex justify-center items-center bg-emerald-400 text-emerald-900 text-sm font-medium rounded-full"
            onClick={handleSubmit}
          >
            {isLoad ? <LoaderSpinner /> : <IoAddOutline />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDocumentModal;
