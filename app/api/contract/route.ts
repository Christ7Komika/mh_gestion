import { restDate } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { PostContract } from "@/types/api/contract";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";

const Contracts = {
  id: true,
  type: true,
  status: true,
  file: true,
  startDate: true,
  endDate: true,
  createdAt: true,
  employee: {
    select: {
      firstName: true,
      lastName: true,
    },
  },
};

export async function GET() {
  return NextResponse.json({
    data: await prisma.contract.findMany({
      select: Contracts,
      orderBy: {
        createdAt: "desc",
      },
    }),
    countContract: await prisma.contract.count(),
    countInProgressContract: await prisma.contract.count({
      where: {
        status: true,
      },
    }),
    countEndContract: await prisma.contract.count({
      where: {
        status: false,
      },
    }),
  });
}

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;
  let doc: string = "";

  if (!file) {
    return NextResponse.json({
      message: "Veuillez inserer le document du contrat",
      status: 400,
    });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const path = join(process.cwd(), "public", "upload");
  if (!existsSync(path)) {
    mkdirSync(path);
  }
  writeFileSync(join(path, file.name), buffer);
  let isExpired: string | number;
  if (!((data.get("type") as string) === "CDI")) {
    isExpired = restDate(data.get("endDate") as string);
  } else {
    isExpired = "Unlimited";
  }

  const contract: PostContract = {
    type: data.get("type") as string,
    file: file.name,
    employeeId: data.get("employeeId") as string,
    startDate: data.get("startDate") as string,
    endDate: data.get("endDate") as string,
    status: isExpired === "Expiré" ? false : true,
  };

  try {
    await prisma.contract.create({
      data: {
        type: contract.type,
        status: contract.status,
        file: contract.file,
        startDate: contract.startDate,
        endDate: contract.endDate,
        employee: {
          connect: {
            id: contract.employeeId,
          },
        },
      },
    });
    return NextResponse.json({
      message: "La requête a été exécuté avec succès",
      status: 200,
    });
  } catch (err) {
    unlinkSync(join(process.cwd(), "public", "upload", file.name));
    return NextResponse.json({
      message: "La requête a échoué",
      status: 400,
    });
  }
}
