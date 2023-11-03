"use client";
import Card from "@/app/components/card/Card";
import AddContract from "@/app/components/actionButton/contract/AddContract";
import ContracTable from "@/app/components/table/ContractTable";
import { Contract, GetContracts } from "@/types/contract";
import useSWR from "swr";
import { host } from "@/lib/host";
import { useEffect, useState } from "react";
import LoaderSpinner from "@/app/components/loader/LoaderSpinner";
import Search from "@/app/components/input/Search";

const Contract = () => {
  const [count, setCount] = useState({
    total: 0,
    inProgress: 0,
    expired: 0,
  });
  const [contracts, setContracts] = useState<Contract[] | null>(null);
  const [filterContracts, setFilterContracts] = useState<Contract[] | null>(
    null
  );
  const [search, setSearch] = useState<string>("");
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR<GetContracts>(`${host}/contract`, fetcher);

  useEffect(() => {
    if (data) {
      setContracts(data.data);
      setFilterContracts(data.data);
      setCount({
        total: data.countContract,
        inProgress: data.countInProgressContract,
        expired: data.countEndContract,
      });
    }
  }, [data]);

  useEffect(() => {
    if (contracts) {
      if (search === "") {
        setFilterContracts([...contracts]);
      } else {
        if (filterContracts)
          setFilterContracts([
            ...filterContracts?.filter(
              (employeeContract) =>
                `${employeeContract.employee.lastName} ${employeeContract.employee.firstName}`
                  .toLowerCase()
                  .search(search.toLowerCase()) !== -1
            ),
          ]);
      }
    }
  }, [search]);

  return (
    <div className="w-full relative z-0">
      <div className=" flex flex-col gap-4 sticky top-4 background">
        <div className="w-full flex gap-2">
          <Search searchFilter={setSearch} />
        </div>
        <div className="w-full flex gap-4">
          <Card
            name="Total contrat"
            value={
              isLoading ? (
                <span>
                  <LoaderSpinner color="#222" w={15} h={15} />
                </span>
              ) : (
                count.total
              )
            }
          />
          <Card
            name="Contrat en cour"
            value={
              isLoading ? (
                <span>
                  <LoaderSpinner color="#222" w={15} h={15} />
                </span>
              ) : (
                count.inProgress
              )
            }
          />
          <Card
            name="Contrat terminé"
            value={
              isLoading ? (
                <span>
                  <LoaderSpinner color="#222" w={15} h={15} />
                </span>
              ) : (
                count.expired
              )
            }
          />
        </div>
        <div className="w-full flex justify-between mt-8 items-center py-2">
          <h2 className="uppercase font-medium text-slate-600 text-2xl">
            Liste des contrats
          </h2>
          <AddContract />
        </div>
      </div>
      <div className="w-full mt-8">
        {isLoading && (
          <div className="w-full flex flex-col justify-center items-center">
            <LoaderSpinner color="#222" w={50} h={50} />
          </div>
        )}
        {filterContracts && filterContracts.length === 0 && (
          <div className="w-full h-12 flex justify-center items-center ">
            <h2>Aucun contrat trouvé.</h2>
          </div>
        )}
        {filterContracts && filterContracts.length >= 1 && (
          <ContracTable data={filterContracts as Contract[]} />
        )}
      </div>
    </div>
  );
};

export default Contract;
