"use client";
import { useState } from "react";
import UpdateModal from "../../modal/employee/UpdateModal";

const EditEmployee = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <UpdateModal handleClose={setOpen} />}
      <span
        className="h-4 w-4 rounded-full bg-blue-500 block cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export default EditEmployee;
