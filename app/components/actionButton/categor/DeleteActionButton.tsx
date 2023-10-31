import { host } from "@/lib/host";
import { OtherDocumentType } from "@/types/document";
import React, { useState } from "react";
import { KeyedMutator } from "swr";
import LoaderSpinner from "../../loader/LoaderSpinner";
import { FaMinus } from "react-icons/fa";

interface Props {
  id: string;
  mutate: KeyedMutator<OtherDocumentType[]>;
}
const DeleteActionButton = ({ id, mutate }: Props) => {
  const [isLoadDelete, setIsLoadDelete] = useState<boolean>(false);

  const handleDelete = async () => {
    if (id) {
      setIsLoadDelete(true);
      const res = await fetch(`${host}/category/${id}`, { method: "DELETE" });
      if (res.ok) {
        await res.json();
        setIsLoadDelete(false);
        mutate();
      }
      setIsLoadDelete(false);
    }
  };
  return (
    <span
      className="font-light text-red-500 cursor-pointer"
      onClick={() => handleDelete()}
    >
      {isLoadDelete ? (
        <LoaderSpinner w={15} h={15} color="red" />
      ) : (
        <FaMinus size={12} />
      )}
    </span>
  );
};

export default DeleteActionButton;
