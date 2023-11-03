"use client";
import React, { useCallback, useState, MouseEventHandler, useRef } from "react";
import InputText from "../../input/InputText";
import { IoAddOutline } from "react-icons/io5";
import { host } from "@/lib/host";
import LoaderSpinner from "../../loader/LoaderSpinner";
import { OtherDocumentType } from "@/types/document";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";
import toast, { Toaster } from "react-hot-toast";
import DeleteActionButton from "../../actionButton/categor/DeleteActionButton";
import { Employee } from "@/types/api/employee";
import { KeyedMutator } from "swr";

interface Props {
  mutate: KeyedMutator<Employee>;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddDocumentModal = ({ handleClose, mutate: mutateEmployee }: Props) => {
  const [name, setName] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { isLoading, data, mutate } = useSWR<OtherDocumentType[]>(
    `${host}/category`,
    fetcher
  );

  const handleSubmit: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (!name) {
        return toast.error("Veuillez inserer le nom de la catégorie");
      }

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
          mutate();
          mutateEmployee();
          setName("");
          return;
        })
        .catch(() => {
          setIsLoad(false);
          return;
        });
    },
    [name]
  );

  return (
    <>
      <Toaster />
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
          <div className="w-full flex flex-col gap-1 mt-2">
            <h2 className="text-sm font-bold uppercase text-slate-600 ">
              LISTE DES TYPES DE DOCUMENT
            </h2>
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
              {isLoading && <Skeleton count={4} height={30} />}
              {data &&
                data.length >= 1 &&
                data.map((category) => (
                  <div
                    className="h-auto rounded-md bg-slate-100 p-2 flex justify-between items-center"
                    key={category.id}
                  >
                    <p className=" text-sm text-slate-500">{category.name}</p>
                    {category.OtherDocument.length >= 1 ? (
                      <span className="text-xs bg-red-100 rounded-md px-3 py-1 text-red-500 ">
                        Utilisé
                      </span>
                    ) : (
                      <DeleteActionButton id={category.id} mutate={mutate} />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDocumentModal;
