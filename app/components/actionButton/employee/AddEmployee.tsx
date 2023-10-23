"use client";
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import AddModal from "../../modal/employee/AddModal";

const AddEmployee = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <AddModal handleClose={setOpen} open={open} />}
      <button
        className="border border-slate-300 bg-white h-10 flex justify-center items-center gap-4 text-slate-500 w-40 rounded-md cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm">Nouveau</span>
        <FaUserPlus size={15} />
      </button>
    </>
  );
};

export default AddEmployee;
