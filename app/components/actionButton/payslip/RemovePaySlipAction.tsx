"use client";
import { useState } from "react";
import RemovePaySlipModal from "../../modal/payslip/RemovePaySlipModal";

type Props = { id: string; pos: number };

const RemovePayslipAction = ({ id, pos }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <RemovePaySlipModal handleClose={setOpen} id={id} pos={pos} />}
      <span
        className="h-4 w-4 rounded-full bg-red-500 block cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export default RemovePayslipAction;
