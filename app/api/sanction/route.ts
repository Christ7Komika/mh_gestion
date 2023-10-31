import prisma from "@/lib/prisma";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { restDate } from "@/lib/helpers";

const Sanctions = {
  id: true,
  status: true,
  file: true,
  motif: true,
  startDate: true,
  endDate: true,
  employee: {
    select: {
      firstName: true,
      lastName: true,
    },
  },
  createdAt: true,
};

interface SanctionData {
  file?: string;
  motif?: string;
  status?: boolean;
  startDate?: string;
  endDate?: string;
}

export async function GET() {
  return NextResponse.json({
    data: await prisma.sanction.findMany({
      select: Sanctions,
      orderBy: {
        createdAt: "desc",
      },
    }),
    total: await prisma.sanction.count(),
    inProgress: await prisma.sanction.count({
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

  const sanctions: SanctionData = {};

  // ADD FILE
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const path = join(process.cwd(), "public", "upload");
    if (!existsSync(path)) {
      mkdirSync(path);
    }
    writeFileSync(join(path, file.name), buffer);
    sanctions.file = file.name;
  }

  // ADD START DATE
  if (startDate) {
    sanctions.startDate = startDate as string;
  }

  // ADD END DATE AND STATUS
  if (endDate) {
    sanctions.endDate = endDate as string;
    sanctions.status = restDate(endDate as string) === "Expiré" ? false : true;
  }
  if (motif) {
    sanctions.motif = motif as string;
  }

  // CREATE A NEW SANCTION
  try {
    await prisma.sanction.create({
      data: {
        ...sanctions,
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
