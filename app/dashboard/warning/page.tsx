"use client";
import { ElementStatus } from "@/app/api/notification/route";
import Card from "@/app/components/card/Card";
import Search from "@/app/components/input/Search";
import LoaderSpinner from "@/app/components/loader/LoaderSpinner";
import NotificationTable from "@/app/components/table/NotificationTable";
import { host } from "@/lib/host";
import { Notification } from "@/types/notification";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Warning() {
  const [search, setSearch] = useState<string>("");
  const [documents, setDocuments] = useState<ElementStatus[] | []>([]);
  const [filterDocuments, setFilterDocuments] = useState<ElementStatus[] | []>(
    []
  );

  const [all, setAll] = useState<boolean>(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR<Notification>(
    `${host}/notification`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setDocuments(
        [...data.expired, ...data.expiredToday, ...data.expiredIn10Days]
          ?.sort((a, b) => Date.parse(a?.endDate) - Date.parse(b?.endDate))
          ?.filter((element) => element !== null)
          ?.reverse()
      );
      setFilterDocuments(
        [...data.expired, ...data.expiredToday, ...data.expiredIn10Days]
          ?.sort((a, b) => Date.parse(a?.endDate) - Date.parse(b?.endDate))
          ?.filter((element) => element !== null)
          ?.reverse()
      );
    }
  }, [data]);

  useEffect(() => {
    if (all) {
      setFilterDocuments([...documents]);
    } else {
      setFilterDocuments([...documents.filter((doc) => doc.isNew === true)]);
    }
  }, [all]);

  useEffect(() => {
    if (documents) {
      if (!search) {
        setFilterDocuments([...documents]);
      } else {
        if (filterDocuments) {
          setFilterDocuments([
            ...filterDocuments.filter(
              (doc) =>
                `${doc.employee}`.toLowerCase().search(search.toLowerCase()) !==
                -1
            ),
          ]);
        }
      }
    }
  }, [search, documents]);

  return (
    <div className="w-full relative z-0">
      <div className=" flex flex-col gap-4 sticky top-4 background">
        <div className="flex gap-2">
          <Search searchFilter={setSearch} />
          <button
            onClick={() => setAll(!all)}
            className={`h-10 rounded bg-${
              all ? "blue" : "slate"
            }-100 w-40 border border-slate-200 p-2  flex justify-center items-center outline-slate-300 outline-2 text-slate-600 cursor-pointer ${
              all ? "shadow-inner " : ""
            }`}
          >
            Tous
          </button>
        </div>

        <div className="w-full flex gap-4">
          <Card
            name="Expiré"
            value={
              isLoading ? (
                <span>
                  <LoaderSpinner w={15} h={15} color="#222" />
                </span>
              ) : (
                data?.expired.filter((element) => element !== null).length
              )
            }
          />
          <Card
            name="Expire aujourd'hui"
            value={
              isLoading ? (
                <span>
                  <LoaderSpinner w={15} h={15} color="#222" />
                </span>
              ) : (
                data?.expiredToday.filter((element) => element !== null).length
              )
            }
          />
          <Card
            name="Expiration dans 10 jours"
            value={
              isLoading ? (
                <span>
                  <LoaderSpinner w={15} h={15} color="#222" />
                </span>
              ) : (
                data?.expiredIn10Days.filter((element) => element !== null)
                  .length
              )
            }
          />
        </div>
        {isLoading && <LoaderSpinner w={50} h={50} color="#222" />}
        {filterDocuments && filterDocuments.length >= 1 && (
          <NotificationTable notifications={filterDocuments} />
        )}
        {(!filterDocuments || filterDocuments.length === 0) && (
          <div className="w-full h-12 flex justify-center items-center ">
            <h2>Aucune notification trouvé.</h2>
          </div>
        )}
      </div>
    </div>
  );
}
