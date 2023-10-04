"use client";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import UpdateModal from "../../modal/employee/UpdateModal";

const ViewEditButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      {open && <UpdateModal handleClose={setOpen} />}
      <button
        className="flex gap-2 border border-slate-600 rounded w-32 h-9 items-center justify-center text-slate-500 hover:bg-slate-100 transition-all"
        onClick={() => setOpen(!open)}
      >
        Modifier
        <BiEdit size={15} />
      </button>
    </>
  );
};

export default ViewEditButton;
