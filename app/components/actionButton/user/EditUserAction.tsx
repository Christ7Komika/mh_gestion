"use client";
import { useState } from "react";
import EditUserModal from "../../modal/user/EditUserModal";

type Props = { id: string };

const EditUserAction = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <EditUserModal handleClose={setOpen} id={id} />}
      <span
        className="h-4 w-4 rounded-full bg-blue-500 block cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export default EditUserAction;
