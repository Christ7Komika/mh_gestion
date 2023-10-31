"use client";
import { useState } from "react";
import ViewSanctionModal from "../../modal/sanction/ViewSanctionModal";
import { Sanction } from "@/types/sanction";

type Props = { sanction: Sanction };

const ViewSanctionAction = ({ sanction }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <ViewSanctionModal handleClose={setOpen} sanction={sanction} />}
      <span
        className="h-4 w-4 rounded-full bg-emerald-500 block cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export default ViewSanctionAction;
