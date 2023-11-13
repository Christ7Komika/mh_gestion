"use client";

import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import InputText from "../../input/InputText";
import SelectLabel from "../../input/SelectLabel";
import { Employee } from "@/types/api/employee";
import LoaderSpinner from "../../loader/LoaderSpinner";
import { host } from "@/lib/host";
import { KeyedMutator } from "swr";
import InputDateTime from "../../input/InputDateTime";

interface Props {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  employee: Employee;
  mutate: KeyedMutator<Employee>;
}

const UpdateModal = ({ handleClose, employee, mutate }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("Homme");
  const [age, setAge] = useState("0");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("Célibataire");
  const [children, setChildren] = useState("0");
  const [post, setPost] = useState("");
  const [isLoad, setIsLoad] = useState<boolean>(false);

  useEffect(() => {
    setFirstName(employee.firstName);
    setLastName(employee.lastName);
    setNationality(employee.nationality || "");
    setGender(employee.gender || "Homme");
    setAge(employee.age?.toString() || "0");
    setAddress(employee.address || "");
    setPhone(employee.phone || "");
    setPost(employee.post || "");
    setEmail(employee.email || "");
    setMaritalStatus(employee.maritalStatus || "Célibataire");
    setChildren(employee.children?.toString() || "0");
  }, []);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = {
      firstName: firstName,
      lastName: lastName,
      nationality: nationality,
      gender: gender,
      age: age,
      address: address,
      phone: phone,
      email: email,
      maritalStatus: maritalStatus,
      children: children,
      post: post,
    };
    setIsLoad(true);
    fetch(`${host}/employee/${employee.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      referrer: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        mutate();
        setIsLoad(false);
        handleClose(false);
      })
      .catch(() => {
        setIsLoad(false);
      });
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0  bg-slate-200 flex justify-center items-center backdrop-blur bg-opacity-25 z-20">
      <form className="w-auto rounded bg-white shadow p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold uppercase text-slate-600">
            Modifier employé
          </h2>
          <span
            className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-300 transition-all"
            onClick={() => handleClose(false)}
          ></span>
        </div>
        <div className="flex gap-4">
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
            className="w-32 h-10 flex justify-center items-center bg-emerald-400 text-emerald-900 rounded text-sm font-medium"
            onClick={(e) => handleSubmit(e)}
          >
            {isLoad ? <LoaderSpinner w={20} h={20} color="#fff" /> : "Valider"}
          </button>
        </div>
      </form>
    </div>
  );
};

const sexe = ["Homme", "Femme"];
const status = ["Marié", "Célibataire"];

export default UpdateModal;
