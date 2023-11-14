"use client";
import { useState } from "react";
import RemoveUserModal from "../../modal/user/RemoveUserModal";

type Props = { id: string; pos: number };

const RemoveUserAction = ({ id, pos }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <RemoveUserModal handleClose={setOpen} id={id} pos={pos} />}
      <span
        className="h-4 w-4 rounded-full bg-red-500 block cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export default RemoveUserAction;
