"use client";
import toast, { Toaster } from "react-hot-toast";
import React, { useState } from "react";
import InputText from "../../input/InputText";
import SelectLabel from "../../input/SelectLabel";
import { host } from "@/lib/host";
import Modal from "react-modal";
import InputFile from "../../input/InputFile";
import useSWR from "swr";
import LoaderSpinner from "../../loader/LoaderSpinner";
import InputDateTime from "../../input/InputDateTime";
import { GetEmployees } from "@/types/api/employee";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const AddModal = ({ handleClose, open }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("Homme");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("Célibataire");
  const [children, setChildren] = useState("0");
  const [post, setPost] = useState("");
  const [profil, setProfl] = useState<File | null>(null);
  const [isLoad, setIsload] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);

  const { data, mutate } = useSWR<GetEmployees>(`${host}/employee`);

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const postRequest = (data: FormData) => {
    setIsload(true);
    fetch(`${host}/employee`, {
      method: "POST",
      body: data,
      redirect: "follow",
    })
      .then(() => {
        mutate();
        setIsload(false);
        handleClose(false);
      })
      .catch(() => {
        setIsload(false);
        toast.error("La requête a échoué.");
      });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!firstName) {
      toast.error("Veuillez inserer le prénom");
    }
    if (!lastName) {
      toast.error("Veuillez inserer le nom");
    }
    if (!gender) {
      toast.error("Veuillez selectionner le genre de la personne");
    }
    if (!maritalStatus) {
      toast.error("Veuillez inserer le status matrimonial");
    }
    if (!post) {
      toast.error("Veuillez inserer le poste");
    }

    if (email && !regex.test(email)) {
      toast.error("L'adresse mail saisie est invalide");
    }

    const data = new FormData();

    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("nationality", nationality);
    data.append("gender", gender);
    data.append("age", age);

    data.append("post", post);
    if (profil) {
      data.append("profil", profil);
    }
    if (maritalStatus) {
      data.append("maritalStatus", maritalStatus);
    }
    if (email) {
      data.append("email", email);
    }

    if (address) {
      data.append("address", address);
    }

    if (phone) {
      data.append("phone", phone);
    }

    postRequest(data);
  };

  return (
    <Modal
      isOpen={open}
      className="w-screen h-screen fixed top-0 left-0  bg-slate-200 flex justify-center items-center backdrop-blur bg-opacity-25 z-50"
    >
      <form className="w-auto rounded bg-white shadow p-4 flex flex-col gap-4 ">
        <Toaster position="bottom-right" />
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold uppercase text-slate-600">
            Nouvel employé
          </h2>
          <span
            className="w-5 h-5 rounded-full bg-red-500  hover:bg-red-300 transition-all cursor-pointer"
            onClick={() => handleClose(false)}
          ></span>
        </div>
        <div className="flex gap-4">
          <InputFile label="Profile" setValue={setProfl} />
          <InputText label="Nom *" value={firstName} setValue={setFirstName} />
          <InputText label="Prénom *" value={lastName} setValue={setLastName} />
        </div>
        <div className="flex gap-4">
          <InputText label="Poste *" value={post} setValue={setPost} />
          <InputText
            label="Nationalité"
            value={nationality}
            setValue={setNationality}
          />
          <SelectLabel
            data={sexe}
            label="Genre *"
            value={gender}
            setValue={setGender}
          />
        </div>
        <div className="flex gap-4">
          <InputText label="Adresse" value={address} setValue={setAddress} />
          <InputDateTime label="Age *" value={age} setValue={setAge} />
        </div>
        <div className="flex gap-4">
          <InputText
            label="Numéro Téléphone"
            value={phone}
            setValue={setPhone}
          />
          <InputText label="Email" value={email} setValue={setEmail} />
        </div>
        <div className="flex gap-4">
          <SelectLabel
            data={status}
            label="Etat matrimonial"
            value={maritalStatus}
            setValue={setMaritalStatus}
          />
          <InputText
            label="Nombre d'enfant"
            value={children}
            setValue={setChildren}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-32 h-10 flex justify-center items-center bg-emerald-400 text-emerald-900 rounded text-sm font-medium"
          >
            {isLoad ? <LoaderSpinner /> : "Valider"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

const sexe = ["Homme", "Femme"];
const status = ["Marié", "Célibataire"];

export default AddModal;
