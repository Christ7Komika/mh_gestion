"use client";
import { AddDocument } from "@/app/components/actionButton/employee/AddDocument";
import ViewDocument from "@/app/components/actionButton/employee/ViewDocument";
import ViewEditButton from "@/app/components/actionButton/employee/ViewEditButton";
import { BiPrinter } from "react-icons/bi";
import { host } from "@/lib/host";
import useSWR from "swr";
import { Employee } from "@/types/api/employee";
import ContentLoader from "react-content-loader";
import { useEffect, useState } from "react";
import { AddDocumentType } from "@/app/components/actionButton/employee/AddDocumentType";
import EmployeeProfil from "@/app/components/actionButton/employee/EmployeeProfil";
import { Categories } from "@/types/api/categorie";

interface Props {
  params: {
    id: string;
  };
}

const Employee = ({ params: { id } }: Props) => {
  const [employee, setEmployee] = useState<Employee>();
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const [hasDocument, setHasDocument] = useState<boolean>(false);
  const {
    data,
    isLoading,
    mutate: mutateEmployee,
  } = useSWR<Employee>(`${host}/employee/${id}`, fetcher);
  const {
    data: categories,
    isLoading: isLoadingCategories,
    mutate: mutateCategories,
  } = useSWR<Categories[]>(`${host}/category/${id}`, fetcher);

  console.log("==> ", categories);

  useEffect(() => {
    setEmployee(data);

    if (
      data &&
      (data.Contract?.length >= 1 ||
        data.Leave?.length >= 1 ||
        data.Sanction?.length >= 1 ||
        data.OtherDocument?.length >= 1)
    ) {
      setHasDocument(true);
    }
  }, [data]);

  return (
    <div className="w-full flex flex-col gap-2">
      {/* HEADER */}
      <div className="flex justify-between border-b bottom-4 pb-4">
        <h2 className="font-bold text-xl text-slate-600">
          INFORMATION EMPLOYÉ
        </h2>
        <div className="flex gap-2">
          {isLoading ? (
            <ContentLoader
              speed={2}
              width={400}
              height={20}
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="3" ry="3" width="100%" height="20" />
            </ContentLoader>
          ) : (
            <>
              <ViewEditButton
                employee={employee as Employee}
                mutate={mutateEmployee}
              />
              <button className="flex gap-2 border border-slate-600 rounded w-32 h-9 items-center justify-center text-slate-500 hover:bg-slate-100 transition-all">
                Imprimer
                <BiPrinter size={15} />
              </button>
            </>
          )}
        </div>
      </div>
      {/* HEADER */}

      {/* USER PROFIL */}

      {/* SECTION ONE */}
      <div className="grid grid-cols-2 gap-4">
        {isLoading ? (
          <>
            <div className="bg-white shadow p-4 rounded">
              <ContentLoader
                speed={2}
                width={400}
                height={160}
                viewBox="0 0 400 160"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="48" y="8" rx="3" ry="3" width="100%" height="6" />
                <rect x="48" y="26" rx="3" ry="3" width="100%" height="6" />
                <rect x="0" y="56" rx="3" ry="3" width="100%" height="6" />
                <rect x="0" y="72" rx="3" ry="3" width="100%" height="6" />
                <rect x="0" y="88" rx="3" ry="3" width="100%" height="6" />
                <circle cx="20" cy="20" r="20" />
              </ContentLoader>
            </div>
            <div className="bg-white shadow p-4 rounded">
              <ContentLoader
                speed={2}
                width={400}
                height={160}
                viewBox="0 0 400 160"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="8" rx="3" ry="3" width="100%" height="6" />
                <rect x="0" y="26" rx="3" ry="3" width="100%" height="6" />
                <rect x="0" y="36" rx="3" ry="3" width="100%" height="6" />
                <rect x="0" y="56" rx="3" ry="3" width="100%" height="6" />
                <rect x="0" y="72" rx="3" ry="3" width="100%" height="6" />
                <rect x="0" y="88" rx="3" ry="3" width="100%" height="6" />
              </ContentLoader>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white shadow p-4 rounded">
              <div className="flex gap-2">
                <div className="w-20 h-20 rounded-full bg-slate-300 relative">
                  {employee?.id && (
                    <EmployeeProfil
                      profil={employee?.profil}
                      id={employee.id}
                      mutate={mutateEmployee}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <p className="text-slate-600 uppercase underline">Nom: </p>
                    <p className=" text-slate-500">{employee?.lastName}</p>
                  </div>
                  <div className="flex gap-1">
                    <p className="text-slate-600 uppercase underline">
                      Prénom:{" "}
                    </p>
                    <p className=" text-slate-500">{employee?.firstName}</p>
                  </div>
                  <div className="flex gap-1">
                    <p className="text-slate-600 uppercase underline">
                      Poste:{" "}
                    </p>
                    <p className=" text-slate-500">{employee?.post}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <div className="flex gap-1 ">
                  <p className="text-slate-600 uppercase underline">
                    Nationalité:{" "}
                  </p>
                  <p className=" text-slate-500">
                    {employee?.nationality || "inconnu"}
                  </p>
                </div>
                <div className="flex gap-1 ">
                  <p className="text-slate-600 uppercase underline">Genre: </p>
                  <p className=" text-slate-500">{employee?.gender}</p>
                </div>
              </div>
              <div className="flex gap-1 ">
                <p className="text-slate-600 uppercase underline">Adresse: </p>
                <p className=" text-slate-500">
                  {employee?.address || "inconnu"}
                </p>
              </div>
              <div className="flex gap-1">
                <p className="text-slate-600 uppercase underline">
                  Numéro de téléphone:{" "}
                </p>
                <p className=" text-slate-500">
                  {employee?.phone || "inconnu"}
                </p>
              </div>
              <div className="flex gap-1  items-end ">
                <p className="text-slate-600 uppercase underline">
                  Adresse électronique:{" "}
                </p>
                <p className=" text-slate-500">
                  {employee?.email || "inconnu"}
                </p>
              </div>
            </div>
            <div className="bg-white shadow p-4 rounded">
              <div className="flex flex-col gap-1 mt-2">
                <div className="flex gap-1 ">
                  <p className="text-slate-600 uppercase underline">
                    Etat matrimonial:{" "}
                  </p>
                  <p className=" text-slate-500">
                    {employee?.maritalStatus || "inconnu"}
                  </p>
                </div>
                <div className="flex gap-1 ">
                  <p className="text-slate-600 uppercase underline">
                    Nombre d'enfant:{" "}
                  </p>
                  <p className=" text-slate-500">
                    {employee?.children || "inconnu"}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {/* SECTION ONE */}

      {/* DOCUMENT ACTION */}
      <div className="flex justify-between py-4">
        {isLoading ? (
          <ContentLoader
            speed={2}
            width={400}
            height={20}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="3" ry="3" width="100%" height="20" />
          </ContentLoader>
        ) : (
          <>
            <h2 className="font-bold text-xl text-slate-600">
              AUTRE INFORMATION
            </h2>
            <div className="flex gap-2">
              <AddDocumentType mutate={mutateEmployee} />
              {employee?.id && (
                <AddDocument
                  id={employee.id}
                  mutate={mutateEmployee}
                  mutateCategories={mutateCategories}
                />
              )}
            </div>
          </>
        )}
      </div>
      {/*  DOCUMENT ACTION */}

      {/* SECTION TWO */}
      {isLoadingCategories && (
        <div className="bg-white shadow p-4 rounded flex flex-col gap-2">
          <ContentLoader
            speed={2}
            width={400}
            height={160}
            viewBox="0 0 400 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="3" ry="3" width="100%" height="6" />
            <rect x="0" y="16" rx="3" ry="3" width="100%" height="6" />
            <rect x="0" y="36" rx="3" ry="3" width="100%" height="6" />
            <rect x="0" y="56" rx="3" ry="3" width="100%" height="6" />
            <rect x="0" y="76" rx="3" ry="3" width="100%" height="6" />
            <rect x="0" y="96" rx="3" ry="3" width="100%" height="6" />
            <rect x="0" y="116" rx="3" ry="3" width="100%" height="6" />
            <rect x="0" y="136" rx="3" ry="3" width="100%" height="6" />
            <rect x="0" y="156" rx="3" ry="3" width="100%" height="6" />
            <rect x="0" y="176" rx="3" ry="3" width="100%" height="6" />
            <rect x="0" y="196" rx="3" ry="3" width="100%" height="6" />
          </ContentLoader>
        </div>
      )}
      {categories && (
        <div className="bg-white shadow p-4 rounded flex flex-col gap-2 h-full">
          {/* OTHER DOCUMENT */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((categorie) => (
              <div
                className="flex gap-2 items-center py-2 px-4 rounded-full bg-slate-50 "
                key={categorie.id}
              >
                <p className="text-slate-600 uppercase">
                  {categorie.name} ({categorie.OtherDocument.length})
                </p>
                <ViewDocument
                  doc={categorie.OtherDocument}
                  mutate={mutateCategories}
                  name={categorie.name}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {/* SECTION TWO */}

      {/* USER PROFIL */}
    </div>
  );
};

export default Employee;
