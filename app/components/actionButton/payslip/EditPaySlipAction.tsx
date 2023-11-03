"use client";
import { useState } from "react";
import EditPaySlipModal from "../../modal/payslip/EditPaySlipModal";

type Props = { id: string };

const EditPayslipAction = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <EditPaySlipModal handleClose={setOpen} idPayslip={id} />}
      <span
        className="h-4 w-4 rounded-full bg-blue-500 block cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export default EditPayslipAction;
