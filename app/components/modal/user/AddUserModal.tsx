"use client";
import React, { useState } from "react";
import SelectLabel from "../../input/SelectLabel";
import toast, { Toaster } from "react-hot-toast";
import LoaderSpinner from "../../loader/LoaderSpinner";
import InputText from "../../input/InputText";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { host } from "@/lib/host";
import useSWR from "swr";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUserModal = ({ handleClose }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { mutate } = useSWR(`${host}/user`);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!username) {
      toast.error("Veuillez inserer le nom de l'utilisateur");
      return;
    }
    if (!password) {
      toast.error("Veuillez inserer le mot de passe");
      return;
    }
    if (!role) {
      toast.error("Veuillez inserer le role de l'utilisateur");
      return;
    }

    setIsLoad(true);
    const res = await fetch(`${host}/user`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        role,
      }),
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      mutate();
      setIsLoad(false);
      handleClose(false);
      return;
    }
    setIsLoad(false);
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0  bg-slate-200 flex justify-center items-center backdrop-blur bg-opacity-25 z-30">
      <Toaster />
      <form className="w-full max-w-md rounded bg-white shadow p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold uppercase text-slate-600">
            Nouvel utilisateur
          </h2>
          <span
            className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
            onClick={() => handleClose(false)}
          ></span>
        </div>
        <div className="flex gap-4 w-full">
          <InputText
            label="Utilisateur"
            setValue={setUsername}
            value={username}
          />
        </div>
        <div className="flex gap-4 w-full relative">
          <InputText
            label="Mot de passe"
            setValue={setPassword}
            value={password}
            type={open ? "text" : "password"}
          />
          <span
            onClick={() => setOpen(!open)}
            className="absolute top-11 right-2 -translate-y-2/4 w-6 h-6 rounded-full bg-slate-400 flex justify-center items-center  cursor-pointer"
          >
            {open ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
          </span>
        </div>
        <div className="flex gap-4 w-full">
          <SelectLabel
            data={ROLE}
            label="Role de l'utilisateur"
            value={role}
            setValue={setRole}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className=" text-white w-32 h-10 flex justify-center items-center bg-emerald-400  rounded text-sm font-medium"
            onClick={handleSubmit}
          >
            {isLoad ? <LoaderSpinner w={15} h={15} color="#fff" /> : "Valider"}
          </button>
        </div>
      </form>
    </div>
  );
};

const ROLE = ["USER", "ADMIN"];

export default AddUserModal;
