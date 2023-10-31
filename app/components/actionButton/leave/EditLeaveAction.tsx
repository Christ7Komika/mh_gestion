"use client";
import { useState } from "react";
import EditLeaveModal from "../../modal/leave/EditLeaveModal";

type Props = { id: string };

const EditLeaveAction = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <EditLeaveModal handleClose={setOpen} idLeave={id} />}
      <span
        className="h-4 w-4 rounded-full bg-blue-500 block cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export default EditLeaveAction;
