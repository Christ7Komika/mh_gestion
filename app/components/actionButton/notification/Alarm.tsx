"use client";
import { NotificationItem } from "@/app/api/notification/route";
import { host } from "@/lib/host";
import { Notification } from "@/types/notification";
import { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";
import useSWR from "swr";
import { useRouter } from "next/navigation";

export default function Alarm() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR<Notification>(`${host}/notification`, fetcher);
  const [documents, setDocuments] = useState<NotificationItem[] | []>([]);
  const route = useRouter();

  useEffect(() => {
    if (data) {
      setDocuments(
        [...data.expired, ...data.expiredToday, ...data.expiredIn10Days]
          ?.sort((a, b) => Date.parse(a?.endDate) - Date.parse(b?.endDate))
          ?.filter((element) => element !== null)
          .filter((doc) => doc.isNew === true)
          ?.reverse()
      );
    }
  }, [data]);
  return (
    <>
      {documents && documents.length >= 1 ? (
        <span
          onClick={() => route.push("/dashboard/warning")}
          className="w-8 h-8  rounded-full fixed bottom-8 right-8 flex justify-center items-center cursor-pointer"
        >
          <Puff
            height="30"
            width="30"
            radius={2}
            color="orange"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </span>
      ) : (
        <></>
      )}
    </>
  );
}
