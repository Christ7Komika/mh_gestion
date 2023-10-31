"use client";
import Card from "@/app/components/card/Card";
import AddLeaveAction from "@/app/components/actionButton/leave/AddLeaveAction";
import { useEffect, useState } from "react";
import { GetLeave, Leave } from "@/types/leave";
import useSWR from "swr";
import { host } from "@/lib/host";
import Search from "@/app/components/input/Search";
import LoaderSpinner from "@/app/components/loader/LoaderSpinner";
import LeaveTable from "@/app/components/table/LeaveTable";

const Leave = () => {
  const [count, setCount] = useState({
    total: 0,
    inProgress: 0,
  });
  const [leaves, setLeaves] = useState<Leave[] | null>(null);
  const [filterLeaves, setFilterLeaves] = useState<Leave[] | null>(null);
  const [search, setSearch] = useState<string>("");
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR<GetLeave>(`${host}/leave`, fetcher);

  useEffect(() => {
    if (data) {
      setLeaves(data.data);
      setFilterLeaves(data.data);
      setCount({
        total: data.total,
        inProgress: data.inProgress,
      });
    }
  }, [data]);

  useEffect(() => {
    if (leaves) {
      if (search === "") {
        setFilterLeaves([...leaves]);
      } else {
        if (filterLeaves) {
          setFilterLeaves([
            ...filterLeaves.filter(
              (leave) =>
                `${leave.employee.lastName} ${leave.employee.firstName}`.search(
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
            name="Total congé(s)"
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
            name="congé(s) en cour"
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
            Liste des congés
          </h2>
          <AddLeaveAction />
        </div>
      </div>
      <div className="w-full mt-8">
        {isLoading && (
          <div className="w-full flex flex-col justify-center items-center">
            <LoaderSpinner color="#222" w={50} h={50} />
          </div>
        )}
        {filterLeaves && filterLeaves.length === 0 && (
          <div className="w-full h-12 flex justify-center items-center ">
            <h2>Aucune sanction trouvé.</h2>
          </div>
        )}
        {filterLeaves && filterLeaves.length >= 1 && (
          <LeaveTable data={filterLeaves as Leave[]} />
        )}
      </div>
    </div>
  );
};

export default Leave;
