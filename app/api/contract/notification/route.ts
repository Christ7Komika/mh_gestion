import { getExpirationStatus } from "@/helpers/helpers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export interface Contract {
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
  const contracts = await prisma.contract.findMany({
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
  if (contracts.length >= 1) {
    return NextResponse.json(
      getExpirationStatus(contracts as Contract[], "Contrat")
    );
  }
  return NextResponse.json(null);
}
