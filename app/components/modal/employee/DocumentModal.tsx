"use client";

import DocumentTable from "../../table/DocumentTable";

type Doc = {
  document: string;
  isExpired: boolean;
  comment: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  OtherDocumentType: {
    name: string;
  }[];
};

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  doc: Doc[];
}

const DocumentModal = ({ handleClose, doc }: Props) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0  bg-slate-200 flex justify-center items-center backdrop-blur bg-opacity-25 z-20">
      <div className="w-auto rounded bg-white shadow p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold uppercase text-slate-600">
            {doc[0].OtherDocumentType[0].name} ({doc.length})
          </h2>
          <span
            className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
            onClick={() => handleClose(false)}
          ></span>
        </div>
        <div className="h-96 overflow-y-auto">
          <DocumentTable doc={doc} />
        </div>
      </div>
    </div>
  );
};

export default DocumentModal;
