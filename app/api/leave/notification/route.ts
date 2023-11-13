import { getExpirationStatus } from "@/helpers/helpers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Leave {
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
  const leaves = await prisma.leave.findMany({
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
  if (leaves.length >= 1) {
    return NextResponse.json(getExpirationStatus(leaves as Leave[], "Congé"));
  }
  return NextResponse.json(null);
}
