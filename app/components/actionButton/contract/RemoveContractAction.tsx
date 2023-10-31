"use client";
import { useState } from "react";
import RemoveContractModal from "../../modal/contract/RemoveContractModal";

type Props = { id: string };

const RemoveContractAction = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <RemoveContractModal handleClose={setOpen} id={id} />}
      <span
        className="h-4 w-4 rounded-full bg-red-500 block cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export default RemoveContractAction;
