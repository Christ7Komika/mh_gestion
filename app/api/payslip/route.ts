import prisma from "@/lib/prisma";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { uploadPath } from "@/lib/host";

const Payslip = {
  id: true,
  salary: true,
  file: true,
  payementDate: true,
  comment: true,
  employeeId: true,
  createdAt: true,
  employee: {
    select: {
      firstName: true,
      lastName: true,
    },
  },
};

interface PayslipData {
  file?: string;
  salary: string;
  comment?: string;
  payementDate: string;
}

export async function GET() {
  return NextResponse.json(
    await prisma.paySlip.findMany({
      select: Payslip,
      orderBy: {
        createdAt: "desc",
      },
    })
  );
}

export async function POST(req: NextRequest) {
  const data = await req.formData();

  const comment = data.get("comment");
  const file = data.get("file") as File | undefined;
  const salary = data.get("salary");
  const payementDate = data.get("payementDate");
  const employeeId = data.get("employeeId") as string;

  const payslip: PayslipData = {
    salary: salary as string,
    payementDate: payementDate as string,
  };

  // ADD FILE
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const path = join(uploadPath);
    if (!existsSync(path)) {
      mkdirSync(path);
    }
    writeFileSync(join(path, file.name), buffer);
    payslip.file = file.name;
  }

  // ADD START DATE
  if (comment) {
    payslip.comment = comment as string;
  }

  // CREATE A NEW SANCTION
  try {
    await prisma.paySlip.create({
      data: {
        ...payslip,
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
    if (file) {
      const path = join(uploadPath, file?.name);
      if (existsSync(path)) {
        unlinkSync(path);
      }
    }
    return NextResponse.json({
      message: "La requête a échoué",
      status: 404,
      error: err,
    });
  }
}
