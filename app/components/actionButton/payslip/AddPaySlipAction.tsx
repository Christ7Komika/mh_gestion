"use client";
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import AddPaySlipModal from "../../modal/payslip/AddPaySlipModal";

type Props = { id: number };

const AddPaySlipAction = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <AddPaySlipModal handleClose={setOpen} />}
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

export default AddPaySlipAction;
