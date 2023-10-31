"use client";
import { Employee } from "@/types/api/employee";
import Image from "next/image";
import { useEffect, useState } from "react";
import { KeyedMutator } from "swr";
import { FaUpload } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: KeyedMutator<Employee>;
  id: string;
  profil?: string;
}

const UpdateProfilModal = ({ handleClose, profil, id, mutate }: Props) => {
  const [defaultImage, setDefaultImage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setDefaultImage(profil || "");
  }, []);
  return (
    <div className="w-screen h-screen fixed top-0 left-0  bg-slate-200 flex justify-center items-center backdrop-blur bg-opacity-25 z-20">
      <div className="relative w-full h-full max-w-[500px] max-h-[500px] ">
        <Image
          src={"/upload/" + profil}
          alt="Profil de l'employé"
          fill
          className="object-cover object-center rounded-full"
        />

        <input
          type="file"
          name="profil"
          id="profil"
          style={{ display: "none" }}
        />
        <div className="absolute rounded  left-2/4 -translate-x-2/4 flex gap-2 p-2 bg-white -bottom-14">
          <label
            htmlFor="profil"
            className="w-5 h-5 bg-blue-400 rounded-full  shadow text-white flex justify-center items-center"
          >
            <FaUpload size={10} />
          </label>
          <span className="w-5 h-5 rounded-full bg-orange-300 text-white cursor-pointer flex justify-center items-center">
            <RxCross2 size={10} />
          </span>

          <span
            className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all "
            onClick={() => handleClose(false)}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilModal;
