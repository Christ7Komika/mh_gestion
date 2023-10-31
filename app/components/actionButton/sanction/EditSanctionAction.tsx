"use client";
import { useState } from "react";
import EditSectionModal from "../../modal/sanction/EditSanctionModal";

type Props = { id: string };

const EditSanctionAction = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <EditSectionModal handleClose={setOpen} idSanction={id} />}
      <span
        className="h-4 w-4 rounded-full bg-blue-500 block cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export default EditSanctionAction;
