"use client";
import Card from "@/app/components/card/Card";
import AddPaySlipAction from "@/app/components/actionButton/payslip/AddPaySlipAction";
import PaySlipTable from "@/app/components/table/PaySlipTable";
import { useEffect, useState } from "react";
import { PaySlip } from "@/types/payslip";
import { host } from "@/lib/host";
import useSWR from "swr";
import LoaderSpinner from "@/app/components/loader/LoaderSpinner";
import Search from "@/app/components/input/Search";

const PaySlip = () => {
  const [count, setCount] = useState(0);
  const [payslip, setPayslip] = useState<PaySlip[] | null>(null);
  const [filterPaySlip, setFilterPaySlip] = useState<PaySlip[] | null>(null);
  const [search, setSearch] = useState<string>("");
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR<PaySlip[]>(`${host}/payslip`, fetcher);

  useEffect(() => {
    if (data) {
      setPayslip(data);
      setFilterPaySlip(data);
      setCount(data.length);
    }
  }, [data]);

  useEffect(() => {
    if (payslip) {
      if (search === "") {
        setFilterPaySlip([...payslip]);
      } else {
        if (filterPaySlip) {
          setFilterPaySlip([
            ...filterPaySlip.filter(
              (payslip) =>
                `${payslip.employee.lastName} ${payslip.employee.firstName}`.search(
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
          <Card name="Bulletin de paie total" value={15} />
          <Card
            name="Total Bulletin de paie"
            value={
              isLoading ? (
                <span>
                  <LoaderSpinner color="#222" w={15} h={15} />
                </span>
              ) : (
                count
              )
            }
          />
        </div>
        <div className="w-full flex justify-between mt-8 items-center py-2">
          <h2 className="uppercase font-medium text-slate-600 text-2xl">
            Bulletin de paie
          </h2>
          <AddPaySlipAction />
        </div>
      </div>
      <div className="w-full mt-8">
        {isLoading && (
          <div className="w-full flex flex-col justify-center items-center">
            <LoaderSpinner color="#222" w={50} h={50} />
          </div>
        )}
        {filterPaySlip && filterPaySlip.length === 0 && (
          <div className="w-full h-12 flex justify-center items-center ">
            <h2>Aucune sanction trouvé.</h2>
          </div>
        )}
        {filterPaySlip && filterPaySlip.length >= 1 && (
          <PaySlipTable data={filterPaySlip as PaySlip[]} />
        )}
      </div>
    </div>
  );
};

export default PaySlip;
