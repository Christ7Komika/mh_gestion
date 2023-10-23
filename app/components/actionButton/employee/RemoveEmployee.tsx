"use client";
import { useState } from "react";
import RemoveModal from "../../modal/employee/RemoveModal";

type Props = {
  id: string;
  employee: string;
};

const RemoveEmployee = ({ id, employee }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <RemoveModal handleClose={setOpen} id={id} employee={employee} />
      )}
      <span
        className="h-4 w-4 rounded-full bg-red-500 block cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export default RemoveEmployee;
