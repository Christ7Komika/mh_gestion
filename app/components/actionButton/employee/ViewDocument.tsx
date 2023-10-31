"use client";
import { useState } from "react";
import { BiBookOpen } from "react-icons/bi";
import DocumentModal from "../../modal/employee/DocumentModal";
import { EmployeeDocument } from "@/types/document";
import { Employee } from "@/types/api/employee";
import { KeyedMutator } from "swr";

interface Props {
  doc: EmployeeDocument[];
  mutate: KeyedMutator<Employee>;
}

const ViewDocument = ({ doc, mutate }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <DocumentModal handleClose={setOpen} doc={doc} mutate={mutate} />
      )}
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
