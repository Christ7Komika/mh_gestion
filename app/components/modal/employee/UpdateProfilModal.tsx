"use client";
import { Employee } from "@/types/api/employee";
import Image from "next/image";
import { useEffect, useState } from "react";
import { KeyedMutator } from "swr";
import { FaImage, FaUpload } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { host } from "@/lib/host";
import toast, { Toaster } from "react-hot-toast";
import LoaderSpinner from "../../loader/LoaderSpinner";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: KeyedMutator<Employee>;
  id: string;
  profil?: string;
}

const UpdateProfilModal = ({ handleClose, profil, id, mutate }: Props) => {
  const [defaultImage, setDefaultImage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    setDefaultImage(profil || "");
  }, []);

  const handleRemoveImage = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFile(null);

    const formData = new FormData();
    formData.append("profil", "");

    setIsLoad(true);
    const res = await fetch(`${host}/employee/img/${id}`, {
      method: "PUT",
      body: formData,
      redirect: "follow",
    });

    if (res.ok) {
      mutate();
      handleClose(false);
      setIsLoad(false);
      return;
    }
    setIsLoad(false);
    return;
  };
  const handleChangeImage = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (!file) {
      return toast.error("Veuillez inserer une photo de profil");
    }
    formData.append("profil", file);
    setIsLoad(true);
    const res = await fetch(`${host}/employee/img/${id}`, {
      method: "PUT",
      body: formData,
      redirect: "follow",
    });

    if (res.ok) {
      mutate();
      handleClose(false);
      setIsLoad(false);
      return;
    }
    setIsLoad(false);
    return;
  };
  return (
    <div className="w-screen h-screen fixed top-0 left-0  bg-slate-200 flex justify-center items-center backdrop-blur bg-opacity-25 z-20">
      <Toaster />
      <div className="relative w-full h-full max-w-[500px] max-h-[500px] ">
        {profil ? (
          <Image
            src={"/upload/" + profil}
            alt="Profil de l'employé"
            fill
            className="object-cover object-center rounded-full"
          />
        ) : (
          <label
            htmlFor="profil"
            className="w-full h-full rounded-full flex justify-center items-center text-slate-400 cursor-pointer bg-slate-300"
          >
            <FaImage size={300} />
          </label>
        )}
        <input
          type="file"
          name="profil"
          id="profil"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files as FileList;
            setFile(file[0]);
          }}
        />
        <div className="absolute rounded  left-2/4 -translate-x-2/4 flex gap-2 p-2 bg-white -bottom-14">
          {isLoad ? (
            <div className="w-full h-full flex justify-center items-center">
              <LoaderSpinner w={20} h={30} color="#222" />
            </div>
          ) : (
            <>
              <span
                className="w-5 h-5 bg-blue-400 rounded-full  shadow text-white flex justify-center items-center cursor-pointer"
                onClick={handleChangeImage}
              >
                <FaUpload size={10} />
              </span>
              <span
                className="w-5 h-5 rounded-full bg-orange-300 text-white cursor-pointer flex justify-center items-center"
                onClick={handleRemoveImage}
              >
                <RxCross2 size={10} />
              </span>

              <span
                className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all "
                onClick={() => handleClose(false)}
              ></span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilModal;
