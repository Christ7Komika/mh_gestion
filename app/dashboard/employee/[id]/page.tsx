import { AddDocument } from "@/app/components/actionButton/employee/AddDocument";
import ViewDocument from "@/app/components/actionButton/employee/ViewDocument";
import ViewEditButton from "@/app/components/actionButton/employee/ViewEditButton";
import { BiPrinter, BiBookOpen, BiCross } from "react-icons/bi";

const Employee = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between border-b bottom-4 pb-4">
        <h2 className="font-bold text-xl text-slate-600">
          INFORMATION EMPLOYÉ
        </h2>
        <div className="flex gap-2">
          <ViewEditButton />
          <button className="flex gap-2 border border-slate-600 rounded w-32 h-9 items-center justify-center text-slate-500 hover:bg-slate-100 transition-all">
            Imprimer
            <BiPrinter size={15} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow p-4 rounded">
          <div className="flex gap-2">
            <div className="w-20 h-20 rounded-full bg-slate-300"></div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <p className="text-slate-600 uppercase underline">Nom: </p>
                <p className=" text-slate-500">Komika</p>
              </div>
              <div className="flex gap-1">
                <p className="text-slate-600 uppercase underline">Prénom: </p>
                <p className=" text-slate-500">Christopher Orlando</p>
              </div>
              <div className="flex gap-1">
                <p className="text-slate-600 uppercase underline">Poste: </p>
                <p className=" text-slate-500">Informaticien</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex gap-1 ">
              <p className="text-slate-600 uppercase underline">
                Nationalité:{" "}
              </p>
              <p className=" text-slate-500">Congolais</p>
            </div>
            <div className="flex gap-1 ">
              <p className="text-slate-600 uppercase underline">Genre: </p>
              <p className=" text-slate-500">Masculin</p>
            </div>
          </div>
          <div className="flex gap-1 ">
            <p className="text-slate-600 uppercase underline">Adresse: </p>
            <p className=" text-slate-500">
              {" "}
              Centre-ville, avenue 2 Jean Jack Adenis, Pointe-Noire
            </p>
          </div>
          <div className="flex gap-1 ">
            <p className="text-slate-600 uppercase underline">
              Numéro de téléphone:{" "}
            </p>
            <p className=" text-slate-500">05 575 16 25 / 06 919 90 87</p>
          </div>
          <div className="flex gap-1 ">
            <p className="text-slate-600 uppercase underline">
              Adresse électronique:{" "}
            </p>
            <p className=" text-slate-500">christkomika7@gmail.com</p>
          </div>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex gap-1 ">
              <p className="text-slate-600 uppercase underline">
                Etat matrimonial:{" "}
              </p>
              <p className=" text-slate-500">Célibataire</p>
            </div>
            <div className="flex gap-1 ">
              <p className="text-slate-600 uppercase underline">
                Nombre d'enfant:{" "}
              </p>
              <p className=" text-slate-500">0</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between py-4">
        <h2 className="font-bold text-xl text-slate-600">AUTRE INFORMATION</h2>
        <div className="flex gap-2">
          <AddDocument />
        </div>
      </div>
      <div className="bg-white shadow p-4 rounded flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <p className="text-slate-600 uppercase ">Assurance Maladie (6)</p>
          <ViewDocument />
          <span className="p-2 rounded-full bg-red-100 text-red-600 rotate-45 cursor-pointer">
            <BiCross size={15} />
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-slate-600 uppercase ">CV (1)</p>
          <ViewDocument />
          <span className="p-2 rounded-full bg-red-100 text-red-600 rotate-45 cursor-pointer">
            <BiCross size={15} />
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-slate-600 uppercase ">Lettre de motivation (1)</p>
          <ViewDocument />
          <span className="p-2 rounded-full bg-red-100 text-red-600 rotate-45 cursor-pointer">
            <BiCross size={15} />
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-slate-600 uppercase ">Contrat (8)</p>
          <ViewDocument />
          <span className="p-2 rounded-full bg-red-100 text-red-600 rotate-45 cursor-pointer">
            <BiCross size={15} />
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-slate-600 uppercase ">Assurance (6)</p>
          <ViewDocument />
          <span className="p-2 rounded-full bg-red-100 text-red-600 rotate-45 cursor-pointer">
            <BiCross size={15} />
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-slate-600 uppercase ">Bulletins de paie (12)</p>
          <ViewDocument />
          <span className="p-2 rounded-full bg-red-100 text-red-600 rotate-45 cursor-pointer">
            <BiCross size={15} />
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-slate-600 uppercase ">Sanction (6)</p>
          <ViewDocument />
          <span className="p-2 rounded-full bg-red-100 text-red-600 rotate-45 cursor-pointer">
            <BiCross size={15} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Employee;
