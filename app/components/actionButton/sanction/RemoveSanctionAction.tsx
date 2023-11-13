"use client";
import { useState } from "react";
import RemoveSanctionModal from "../../modal/sanction/RemoveSanctionModal";

type Props = { id: string; pos: number };

const RemoveSanctionAction = ({ id, pos }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <RemoveSanctionModal handleClose={setOpen} id={id} pos={pos} />}
      <span
        className="h-4 w-4 rounded-full bg-red-500 block cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export default RemoveSanctionAction;
