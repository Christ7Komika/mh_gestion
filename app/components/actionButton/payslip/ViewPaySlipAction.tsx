"use client";
import { useState } from "react";
import { PaySlip } from "@/types/payslip";
import ViewPayslipModal from "../../modal/payslip/ViewPaySlipModal";

type Props = { payslip: PaySlip };

const ViewPaySlipAction = ({ payslip }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <ViewPayslipModal handleClose={setOpen} payslip={payslip} />}
      <span
        className="h-4 w-4 rounded-full bg-emerald-500 block cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export default ViewPaySlipAction;
