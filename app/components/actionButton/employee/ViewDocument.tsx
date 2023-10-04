"use client";
import { useState } from "react";
import { BiBookOpen } from "react-icons/bi";
import DocumentModal from "../../modal/employee/DocumentModal";

const ViewDocument = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <DocumentModal handleClose={setOpen} />}
      <span
        className="p-2 rounded-full bg-emerald-100 text-emerald-600 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <BiBookOpen size={15} />
      </span>
    </>
  );
};

export default ViewDocument;
