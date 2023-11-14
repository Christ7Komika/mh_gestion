import { getExpirationStatus } from "@/helpers/helpers";
import { NextResponse } from "next/server";
import { Contract } from "../contract/notification/route";
import { Document } from "../document/notification/route";
import { Leave } from "../leave/notification/route";
import { Sanctions } from "../sanction/notification/route";
import prisma from "@/lib/prisma";

export interface ElementStatus {
  id: string;
  employee: string;
  status: number;
  file: string;
  isNew: boolean;
  section: string;
  startDate: string;
  endDate: string;
  delay?: string;
}

type Notifications = ElementStatus[];

type NestedNotifications = Notifications[];

export async function GET() {
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

  const sanctions = await prisma.sanction.findMany({
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

  let contractExpiration: ElementStatus[] = [];
  let documentExpiration: ElementStatus[] = [];
  let sanctionExpiration: ElementStatus[] = [];
  let leaveExpiration: ElementStatus[] = [];
  if (contracts.length >= 1) {
    contractExpiration = getExpirationStatus(
      contracts as Contract[],
      "Contrat"
    );
  }
  if (documents.length >= 1) {
    documentExpiration = getExpirationStatus(
      documents as Document[],
      "document"
    );
  }
  if (leaves.length >= 1) {
    leaveExpiration = getExpirationStatus(leaves as Leave[], "Congé");
  }
  if (sanctions.length >= 1) {
    sanctionExpiration = getExpirationStatus(
      sanctions as Sanctions[],
      "Sanction"
    );
  }

  const data: NestedNotifications = [
    [...contractExpiration],
    [...documentExpiration],
    [...leaveExpiration],
    [...sanctionExpiration],
  ];

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
