"use client";
import Card from "@/app/components/card/Card";
import EmployeTable from "@/app/components/table/EmployeTable";
import AddEmployee from "@/app/components/actionButton/employee/AddEmployee";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Employee, GetEmployees } from "@/types/api/employee";
import { host } from "@/lib/host";
import LoaderSpinner from "@/app/components/loader/LoaderSpinner";
import Search from "@/app/components/input/Search";

const Employees = () => {
  const [count, setCount] = useState(0);
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  const [currentContract, setCurrentContract] = useState(0);
  const [endContract, setEndContract] = useState(0);
  const [currentLeave, setCurrentLeave] = useState(0);
  const [filterEmployees, setFilterEmployess] = useState<Employee[] | null>(
    null
  );
  const [filter, setFilter] = useState("");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, isLoading } = useSWR<GetEmployees>(`${host}/employee`, fetcher);

  useEffect(() => {
    if (data) {
      setEmployees(data?.employees);
      setFilterEmployess(data?.employees);
      setCount(data?.count);
      setCurrentContract(data.currentContract);
      setEndContract(data.endContract);
      setCurrentLeave(data.currentLeave);
    }
  }, [data]);

  useEffect(() => {
    if (employees) {
      if (filter === "") {
        setFilterEmployess([...employees]);
      } else {
        if (filterEmployees)
          setFilterEmployess([
            ...filterEmployees?.filter(
              (employee) =>
                `${employee.lastName} ${employee.firstName}`.search(filter) !==
                -1
            ),
          ]);
      }
    }
  }, [filter]);

  return (
    <div className="w-full relative z-0">
      <div className=" flex flex-col gap-4 sticky top-4 background">
        <Search searchFilter={setFilter} />
        <div className="w-full flex gap-4">
          <Card
            name="Total employé"
            value={
              isLoading ? (
                <span>
                  <LoaderSpinner />
                </span>
              ) : (
                count
              )
            }
          />
          <Card
            name="Contrat en cour"
            value={
              isLoading ? (
                <span>
                  <LoaderSpinner />
                </span>
              ) : (
                currentContract
              )
            }
          />
          <Card
            name="Contrat terminé"
            value={
              isLoading ? (
                <span>
                  <LoaderSpinner />
                </span>
              ) : (
                endContract
              )
            }
          />
          <Card
            name="Congé en cour"
            value={
              isLoading ? (
                <span>
                  <LoaderSpinner />
                </span>
              ) : (
                currentLeave
              )
            }
          />
        </div>
        <div className="w-full flex justify-between mt-8 items-center py-2">
          <h2 className="uppercase font-medium text-slate-600 text-2xl">
            Liste des employés
          </h2>
          <AddEmployee />
        </div>
      </div>
      <div className="w-full mt-8">
        {isLoading && (
          <SkeletonTheme>
            <Skeleton height={50} />
            <Skeleton count={11} height={30} />
          </SkeletonTheme>
        )}
        {filterEmployees && filterEmployees.length === 0 && (
          <div className="w-full h-12 flex justify-center items-center ">
            <h2>Aucun employé trouvé.</h2>
          </div>
        )}
        {filterEmployees && filterEmployees.length >= 1 && (
          <EmployeTable data={filterEmployees as Employee[]} />
        )}
      </div>
    </div>
  );
};

export default Employees;
