import { getExpirationStatus } from "@/helpers/helpers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export interface Sanctions {
  id: string;
  startDate: string;
  endDate: string;
  file: string;
  isNew: boolean;
  employee: {
    firstName: string;
    lastName: string;
  };
}

export async function GET(req: Request) {
  const sanctionss = await prisma.sanction.findMany({
    select: {
      id: true,
      startDate: true,
      endDate: true,
      file: true,
      isNew: true,
      employee: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  if (sanctionss.length >= 1) {
    return NextResponse.json(
      getExpirationStatus(sanctionss as Sanctions[], "Sanction")
    );
  }
  return NextResponse.json(null);
}
