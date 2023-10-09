"use client";
import { useState } from "react";
import RemoveLeaveModal from "../../modal/leave/RemoveLeaveModal";

type Props = { id: number };

const RemoveLeaveAction = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <RemoveLeaveModal handleClose={setOpen} />}
      <span
        className="h-4 w-4 rounded-full bg-red-500 block cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export default RemoveLeaveAction;
