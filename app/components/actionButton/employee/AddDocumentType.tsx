"use client";
import { useState } from "react";
import { BiFile } from "react-icons/bi";
import AddDocumentTypeModal from "../../modal/employee/AddDocumentTypeModal";

export const AddDocumentType = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <AddDocumentTypeModal handleClose={setOpen} />}
      <button
        className="flex gap-2 border border-slate-600 rounded w-auto px-4 h-9 items-center justify-center text-slate-500 hover:bg-slate-100 transition-all"
        onClick={() => setOpen(!open)}
      >
        Ajouter categorie
        <BiFile size={15} />
      </button>
    </>
  );
};
