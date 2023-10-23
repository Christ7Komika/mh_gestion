"use client";

import { employee } from "@/app/api/employee/route";
import { host } from "@/lib/host";
import { useState } from "react";
import useSWR from "swr";
import LoaderSpinner from "../../loader/LoaderSpinner";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  employee: string;
}

const RemoveModal = ({ handleClose, id, employee }: Props) => {
  const { mutate } = useSWR(`${host}/employee`);
  const [isLoad, setIsLoad] = useState(false);

  const removeEmployee = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoad(true);
    fetch(`${host}/employee/${id}`, {
      method: "DELETE",
      redirect: "follow",
    })
      .then(() => {
        setIsLoad(false);
        mutate();
        handleClose(false);
      })
      .then(() => {
        setIsLoad(false);
      });
  };
  return (
    <div className="w-screen h-screen fixed top-0 left-0  bg-slate-200 flex justify-center items-center backdrop-blur bg-opacity-25">
      <form className="w-auto rounded bg-white shadow p-4 flex flex-col gap-4">
        <div className="flex justify-end items-center">
          <span
            className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
            onClick={() => handleClose(false)}
          ></span>
        </div>
        <div className="flex h-8 items-center">
          <h2 className="text-slate-500 font-medium text-md">
            Voulez vous vraiment retirer cet employé ''{employee}''
          </h2>
        </div>

        <div className="flex justify-end">
          <button
            className="w-32 h-10 flex justify-center items-center bg-emerald-400 text-emerald-900 rounded text-sm font-medium"
            onClick={(e) => removeEmployee(e)}
          >
            {isLoad ? <LoaderSpinner /> : "Supprimer"}
          </button>
        </div>
      </form>
    </div>
  );
};

const sexe = ["Homme", "Femme"];
const status = ["Marié", "Célibataire"];

export default RemoveModal;
