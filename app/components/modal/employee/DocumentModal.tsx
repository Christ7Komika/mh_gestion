"use client";

import { EmployeeDocument } from "@/types/document";
import DocumentTable from "../../table/DocumentTable";
import { MouseEventHandler, useCallback, useState } from "react";
import LoaderSpinner from "../../loader/LoaderSpinner";
import { host } from "@/lib/host";
import { Employee } from "@/types/api/employee";
import { KeyedMutator } from "swr";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  doc: EmployeeDocument[];
  mutate: KeyedMutator<Employee>;
}

const DocumentModal = ({ handleClose, doc, mutate }: Props) => {
  const [employeeDocument, setEmployeeDocument] =
    useState<EmployeeDocument | null>(null);
  const [docId, setDocId] = useState<string | null>(null);
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const handleGetEmployeeDoc = useCallback((elt: EmployeeDocument | null) => {
    setEmployeeDocument(elt);
  }, []);

  const handleDeleteEmployeeDoc = useCallback(
    (elt: EmployeeDocument | null, id: string | null) => {
      setEmployeeDocument(elt);
      setDocId(id);
    },
    []
  );

  const handleDelete: MouseEventHandler = useCallback(
    async (e) => {
      e.preventDefault();

      if (docId) {
        setIsLoad(true);
        const data = await fetch(`${host}/document/${docId}`, {
          method: "DELETE",
          redirect: "follow",
        });

        if (data.ok) {
          mutate();
          setIsLoad(false);
          setDocId(null);
        }
        setIsLoad(false);
      }
    },
    [docId]
  );

  return (
    <div className="w-screen h-screen fixed top-0 left-0   bg-slate-200 flex justify-center items-center backdrop-blur bg-opacity-25 z-20">
      <div className="w-full max-w-[700px] gap-4 flex flex-col absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 overflow-y-auto max-h-full pt-4">
        <div className="w-full rounded bg-white shadow p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold uppercase text-slate-600">
              {doc[0].otherDocumentType.name} ({doc.length})
            </h2>
            <span
              className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
              onClick={() => handleClose(false)}
            ></span>
          </div>
          <div className="h-96 overflow-y-auto">
            <DocumentTable
              doc={doc}
              getEmployeeDoc={handleGetEmployeeDoc}
              deleteEmployeeDoc={handleDeleteEmployeeDoc}
            />
          </div>
        </div>
        {employeeDocument && (
          <div className="w-full rounded bg-white shadow p-4 flex flex-col gap-2 mb-4">
            <h2 className="text-md font-bold uppercase text-slate-600 flex items-center justify-between">
              Commentaire
              <span
                className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
                onClick={() => handleGetEmployeeDoc(null)}
              ></span>
            </h2>
            <p className="text-sm text-slate-500">{employeeDocument.comment}</p>
          </div>
        )}
        {docId && (
          <div className="w-full rounded bg-white shadow p-4 flex gap-2 mb-4 justify-between items-center">
            <p>Voulez vous supprimer ce document</p>
            <div className="flex gap-2">
              <button
                className=" w-36 h-9 flex items-center justify-center rounded bg-blue-100 text-blue-600 cursor-pointer"
                onClick={handleDelete}
              >
                {isLoad ? (
                  <LoaderSpinner w={20} h={20} color="dodgerblue" />
                ) : (
                  "Confirmer"
                )}
              </button>
              <button
                className=" w-36 h-9 flex items-center justify-center rounded bg-red-50 text-red-500"
                onClick={() => setDocId(null)}
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentModal;
