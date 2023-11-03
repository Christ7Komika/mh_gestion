"use client";
import { useState } from "react";
import { BiFile } from "react-icons/bi";
import AddDocumentModal from "../../modal/employee/AddDocument";
import { KeyedMutator } from "swr";
import { Employee } from "@/types/api/employee";
import { Categories } from "@/types/api/categorie";

interface Props {
  id: string;
  mutate: KeyedMutator<Employee>;
  mutateCategories: KeyedMutator<Categories[]>;
}

export const AddDocument = ({ id, mutate, mutateCategories }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <AddDocumentModal
          id={id}
          handleClose={setOpen}
          mutate={mutate}
          mutateCategories={mutateCategories}
        />
      )}
      <button
        className="flex gap-2 border border-slate-600 rounded w-48 h-9 items-center justify-center text-slate-500 hover:bg-slate-100 transition-all"
        onClick={() => setOpen(!open)}
      >
        Ajouter document
        <BiFile size={15} />
      </button>
    </>
  );
};
