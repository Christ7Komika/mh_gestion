"use client";
import Card from "@/app/components/card/Card";
import AddSanctionAction from "@/app/components/actionButton/sanction/AddSanctionAction";
import SanctionTable from "@/app/components/table/SanctionTable";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { host } from "@/lib/host";
import { GetSanctions, Sanction } from "@/types/sanction";
import Search from "@/app/components/input/Search";
import LoaderSpinner from "@/app/components/loader/LoaderSpinner";

const Sanction = () => {
  const [count, setCount] = useState({
    total: 0,
    inProgress: 0,
  });
  const [sanctions, setSanctions] = useState<Sanction[] | null>(null);
  const [filterSanctions, setFilterSanctions] = useState<Sanction[] | null>(
    null
  );
  const [search, setSearch] = useState<string>("");
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR<GetSanctions>(`${host}/sanction`, fetcher);

  useEffect(() => {
    if (data) {
      setSanctions(data.data);
      setFilterSanctions(data.data);
      setCount({
        total: data.total,
        inProgress: data.inProgress,
      });
    }
  }, [data]);

  useEffect(() => {
    if (sanctions) {
      if (search === "") {
        setFilterSanctions([...sanctions]);
      } else {
        if (filterSanctions) {
          setFilterSanctions([
            ...filterSanctions.filter(
              (sanction) =>
                `${sanction.employee.lastName} ${sanction.employee.firstName}`.search(
                  search
                ) !== -1
            ),
          ]);
        }
      }
    }
  }, [search]);

  return (
    <div className="w-full relative z-0">
      <div className=" flex flex-col gap-4 sticky top-4 background">
        <Search searchFilter={setSearch} />
        <div className="w-full flex gap-4">
          <Card
            name="Total sanction"
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
            name="sanction en cour"
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
        </div>
        <div className="w-full flex justify-between mt-8 items-center py-2">
          <h2 className="uppercase font-medium text-slate-600 text-2xl">
            Liste des sanctions
          </h2>
          <AddSanctionAction />
        </div>
      </div>
      <div className="w-full mt-8">
        {isLoading && (
          <div className="w-full flex flex-col justify-center items-center">
            <LoaderSpinner color="#222" w={50} h={50} />
          </div>
        )}
        {filterSanctions && filterSanctions.length === 0 && (
          <div className="w-full h-12 flex justify-center items-center ">
            <h2>Aucune sanction trouvé.</h2>
          </div>
        )}
        {filterSanctions && filterSanctions.length >= 1 && (
          <SanctionTable data={filterSanctions as Sanction[]} />
        )}
      </div>
    </div>
  );
};

export default Sanction;
