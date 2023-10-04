"use client";
import { useState } from "react";
import { BiFile } from "react-icons/bi";
import AddDocumentModal from "../../modal/employee/AddDocument";

export const AddDocument = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <AddDocumentModal handleClose={setOpen} />}
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
