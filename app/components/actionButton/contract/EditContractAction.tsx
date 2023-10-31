"use client";
import { useState } from "react";
import EditContractModal from "../../modal/contract/EditContractModal";

type Props = { id: string };

const EditContractAction = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <EditContractModal handleClose={setOpen} id={id} />}
      <span
        className="h-4 w-4 rounded-full bg-blue-500 block cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export default EditContractAction;
