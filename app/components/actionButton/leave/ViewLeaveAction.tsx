"use client";
import { useState } from "react";
import { Leave } from "@/types/leave";
import ViewLeaveModal from "../../modal/leave/ViewSanctionModal";

type Props = { leave: Leave };

const ViewLeaveAction = ({ leave }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <ViewLeaveModal handleClose={setOpen} leave={leave} />}
      <span
        className="h-4 w-4 rounded-full bg-emerald-500 block cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export default ViewLeaveAction;
