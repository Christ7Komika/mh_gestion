"use client";
import { useState } from "react";
import { BiBookOpen } from "react-icons/bi";
import DocumentModal from "../../modal/employee/DocumentModal";
import { KeyedMutator } from "swr";
import { Categories, OtherDocument } from "@/types/api/categorie";

interface Props {
  doc: OtherDocument[];
  mutate: KeyedMutator<Categories[]>;
  name: string;
}

const ViewDocument = ({ doc, mutate, name }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <DocumentModal
          handleClose={setOpen}
          doc={doc}
          mutate={mutate}
          name={name}
        />
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
