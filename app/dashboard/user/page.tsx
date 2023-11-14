"use client";
import AddUserAction from "@/app/components/actionButton/user/AddUserAction";
import Card from "@/app/components/card/Card";
import Search from "@/app/components/input/Search";
import LoaderSpinner from "@/app/components/loader/LoaderSpinner";
import UserTable from "@/app/components/table/UserTable";
import { host } from "@/lib/host";
import { useState } from "react";
import useSWR from "swr";

export interface User {
  id: string;
  username: string;
  password: string;
  role: string;
  token: string;
  createdAt: string;
}

const User = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR<User[]>(`${host}/user`, fetcher);

  return (
    <div className="w-full relative z-0">
      <div className=" flex flex-col gap-4 sticky top-4 background">
        <div className="w-full flex gap-4">
          <Card
            name="Total utilisateur"
            value={
              isLoading ? (
                <span>
                  <LoaderSpinner color="#222" w={15} h={15} />
                </span>
              ) : (
                data?.length
              )
            }
          />
        </div>
        <div className="w-full flex justify-between mt-8 items-center py-2">
          <h2 className="uppercase font-medium text-slate-600 text-2xl">
            Liste des utilisateurs
          </h2>
          <AddUserAction />
        </div>
      </div>
      <div className="w-full mt-8">
        {isLoading && (
          <div className="w-full flex flex-col justify-center items-center">
            <LoaderSpinner color="#222" w={50} h={50} />
          </div>
        )}
        {data && data.length === 0 && (
          <div className="w-full h-12 flex justify-center items-center ">
            <h2>Aucune sanction trouvé.</h2>
          </div>
        )}
        {data && data.length >= 1 && <UserTable data={data as User[]} />}
      </div>
    </div>
  );
};

export default User;
