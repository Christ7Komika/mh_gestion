import prisma from "@/lib/prisma";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { restDate } from "@/lib/helpers";

const leaves = {
  id: true,
  status: true,
  file: true,
  startDate: true,
  endDate: true,
  motif: true,
  employeeId: true,
  createdAt: true,
  employee: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  },
};

interface LeaveData {
  file?: string;
  motif?: string;
  status?: boolean;
  startDate?: string;
  endDate?: string;
}

export async function GET() {
  return NextResponse.json({
    data: await prisma.leave.findMany({
      select: leaves,
      orderBy: {
        createdAt: "desc",
      },
    }),
    total: await prisma.leave.count(),
    inProgress: await prisma.leave.count({
      where: {
        status: true,
      },
    }),
  });
}

export async function POST(req: NextRequest) {
  const data = await req.formData();

  const motif = data.get("motif");
  const file = data.get("file") as File | undefined;
  const startDate = data.get("startDate");
  const endDate = data.get("endDate");
  const employeeId = data.get("employeeId") as string;
  let doc: string = "";

  const leaves: LeaveData = {};

  // ADD FILE
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const path = join(process.cwd(), "public", "upload");
    if (!existsSync(path)) {
      mkdirSync(path);
    }
    writeFileSync(join(path, file.name), buffer);
    leaves.file = file.name;
  }

  // ADD START DATE
  if (startDate) {
    leaves.startDate = startDate as string;
  }

  // ADD END DATE AND STATUS
  if (endDate) {
    leaves.endDate = endDate as string;
    leaves.status = restDate(endDate as string) === "Expiré" ? false : true;
  }
  if (motif) {
    leaves.motif = motif as string;
  }

  // CREATE A NEW SANCTION
  try {
    await prisma.leave.updateMany({
      where: {
        employee: {
          id: employeeId,
        },
      },
      data: {
        isNew: false,
      },
    });
    await prisma.leave.create({
      data: {
        ...leaves,
        isNew: true,
        employee: {
          connect: {
            id: employeeId,
          },
        },
      },
    });

    return NextResponse.json({
      message: "La requête à été exécuté avec succès",
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      message: "La requête a échoué",
      status: 404,
      error: err,
    });
  }
}
