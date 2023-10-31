"use client";
import { useState } from "react";
import ViewContractModal from "../../modal/contract/ViewContractModal";
import { Contract } from "@/types/contract";

type Props = { contract: Contract };

const ViewContractAction = ({ contract }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <ViewContractModal handleClose={setOpen} contract={contract} />}
      <span
        className="h-4 w-4 rounded-full bg-emerald-500 block cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export default ViewContractAction;
