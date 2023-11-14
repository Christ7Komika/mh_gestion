import { getExpirationStatus } from "@/helpers/helpers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export interface Document {
  id: string;
  startDate: string;
  endDate: string;
  document: string;
  isNew: boolean;
  otherDocumentType: {
    name: string;
  };
  employee: {
    firstName: string;
    lastName: string;
  };
}

export async function GET(req: Request) {
  const documents = await prisma.otherDocument.findMany({
    select: {
      id: true,
      startDate: true,
      endDate: true,
      document: true,
      isNew: true,
      otherDocumentType: {
        select: {
          name: true,
        },
      },
      employee: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  if (documents.length >= 1) {
    return NextResponse.json(
      getExpirationStatus(documents as Document[], "document")
    );
  }
  return NextResponse.json(null);
}
