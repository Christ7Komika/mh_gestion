import { restDate } from "@/lib/helpers";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { NextResponse, type NextRequest } from "next/server";
import { join } from "path";

interface RouteProps {
  params: {
    id: string;
  };
}

interface PaySlipData {
  file?: string;
  salary?: string;
  comment?: string;
  payementDate?: string;
}

export async function GET(req: NextRequest, { params: { id } }: RouteProps) {
  return NextResponse.json(
    await prisma.paySlip.findUnique({
      where: {
        id,
      },
    })
  );
}

export async function PUT(req: NextRequest, { params: { id } }: RouteProps) {
  const data = await req.formData();
  const payslip: PaySlipData = {};
  const comment = data.get("comment");
  const file = data.get("file") as File | undefined;
  const salary = data.get("salary");
  const payementDate = data.get("payementDate");
  const employeeId = data.get("employeeId") as string;
  let doc: string = "";

  // GET LAST FILE
  const oldSanction = await prisma.sanction.findUnique({ where: { id } });

  payslip.comment = comment as string;

  if (file) {
    if (oldSanction?.file) {
      const path = join(process.cwd(), "public", "upload", oldSanction?.file);
      unlinkSync(path);
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const path = join(process.cwd(), "public", "upload");
    if (!existsSync(path)) {
      mkdirSync(path);
    }
    writeFileSync(join(path, file.name), buffer);
    payslip.file = file.name;
  }
  // ADD START DATE
  payslip.comment = comment as string;
  payslip.salary = salary as string;
  payslip.payementDate = payementDate as string;

  try {
    await prisma.paySlip.update({
      where: { id },
      data: {
        ...payslip,
        employee: {
          connect: {
            id: data.get("employeeId") as string,
          },
        },
      },
    });

    return NextResponse.json({
      message: "La requête a été exécuté avec succès",
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

export async function DELETE(req: NextRequest, { params: { id } }: RouteProps) {
  try {
    const paySlip = await prisma.paySlip.delete({
      where: { id },
    });

    if (paySlip.file) {
      const path = join(process.cwd(), "public", "upload", paySlip.file);
      if (existsSync(path)) {
        unlinkSync(path);
      }
    }
    return NextResponse.json({
      message: "La requête à été exécuté avec succès",
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      message: "La requête à échoué",
      status: 400,
      error: err,
    });
  }
}
