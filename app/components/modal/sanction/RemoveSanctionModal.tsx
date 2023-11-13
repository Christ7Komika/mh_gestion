"use client";
import { host } from "@/lib/host";
import useSWR from "swr";
import { useState } from "react";
import LoaderSpinner from "../../loader/LoaderSpinner";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  pos: number;
}

const RemoveSanctionModal = ({ handleClose, id, pos }: Props) => {
  const { mutate } = useSWR(`${host}/sanction`);
  const [isLoad, setIsLoad] = useState(false);

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoad(true);
    const res = await fetch(`${host}/sanction/${id}`, {
      method: "DELETE",
      redirect: "follow",
    });

    console.log({ id });

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
            Voulez vous vraiment supprimer l'élélement n°{pos}
          </h2>
        </div>

        <div className="flex justify-end">
          <button
            className="w-32 h-10 flex justify-center items-center bg-emerald-400 text-emerald-900 rounded text-sm font-medium"
            onClick={handleDelete}
          >
            {isLoad ? <LoaderSpinner w={20} h={20} /> : "Valider"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RemoveSanctionModal;
