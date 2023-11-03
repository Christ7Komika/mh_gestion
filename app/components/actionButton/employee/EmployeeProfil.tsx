"use client";
import Image from "next/image";
import { useState } from "react";
import UpdateProfilModal from "../../modal/employee/UpdateProfilModal";
import { KeyedMutator } from "swr";
import { Employee } from "@/types/api/employee";
import { FaImage } from "react-icons/fa";

interface Props {
  profil?: string;
  id: string;
  mutate: KeyedMutator<Employee>;
}

const EmployeeProfil = ({ profil, id, mutate }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <UpdateProfilModal
          id={id}
          profil={profil}
          mutate={mutate}
          handleClose={setOpen}
        />
      )}
      {profil ? (
        <Image
          src={"/upload/" + profil}
          alt="Image profile"
          fill
          className="rounded-full object-cover object-center cursor-pointer"
          onClick={() => setOpen(true)}
        />
      ) : (
        <div
          className="w-full h-full rounded-full flex justify-center items-center text-slate-400 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <FaImage size={30} />
        </div>
      )}
    </>
  );
};

export default EmployeeProfil;
