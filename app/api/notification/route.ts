import { host } from "@/lib/host";
import { NextResponse } from "next/server";

export interface NotificationItem {
  id: string;
  status: number;
  employee: string;
  file: string;
  isNew: boolean;
  section: string;
  startDate: string;
  endDate: string;
  delay: string;
}

type Notifications = NotificationItem[];

type NestedNotifications = Notifications[];

export async function GET() {
  const URL = [
    `${host}/contract/notification`,
    `${host}/leave/notification`,
    `${host}/sanction/notification`,
    `${host}/document/notification`,
  ];

  const promises = URL.map((url: string) =>
    fetch(url, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
    })
  );

  const responses = await Promise.all(promises);
  const response = responses.map((res) => res.json());
  const data: NestedNotifications = await Promise.all(response);

  const expiredIn10Days = [
    ...data?.map((subData) => subData?.filter((v) => v.status === 2)).flat(),
  ];
  const expiredToday = [
    ...data?.map((subData) => subData?.filter((v) => v.status === 1)).flat(),
  ];
  const expired = [
    ...data?.map((subData) => subData?.filter((v) => v.status === 0)).flat(),
  ];

  return NextResponse.json({
    expiredIn10Days,
    expiredToday,
    expired,
  });
}
