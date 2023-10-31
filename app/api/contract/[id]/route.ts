import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { join } from "path";
import { existsSync, unlinkSync, writeFileSync } from "fs";
import { restDate } from "@/lib/helpers";

interface RouteProps {
  params: { id: string };
}

export async function GET(req: NextRequest, { params: { id } }: RouteProps) {
  return NextResponse.json(
    await prisma.contract.findUnique({
      where: { id },
      include: {
        employee: true,
      },
    })
  );
}

export async function PUT(req: NextRequest, { params: { id } }: RouteProps) {
  const formData = await req.formData();
  const contract = await prisma.contract.findUnique({ where: { id } });

  const data: any = {};

  if (!contract) {
    return new NextResponse("L'indentifiant est invalide", { status: 404 });
  }

  const file = formData.get("file") as File | null;
  if (file) {
    const path = join(process.cwd(), "public", "upload", contract.file);
    if (existsSync(path)) {
      unlinkSync(path);
      const buffer = Buffer.from(await file.arrayBuffer());
      writeFileSync(join(process.cwd(), "public", "upload", file.name), buffer);
      data.file = file.name;
    }
  }

  if (formData.get("type")) {
    data.type = formData.get("type") as string;
  }
  if (formData.get("startDate")) {
    data.startDate = formData.get("startDate") as string;
  }
  let isExpired: string | number | null = null;
  const endDate = formData.get("endDate");
  const type = formData.get("type");

  if (type === "CDI" && !endDate) {
    isExpired = "Unlimited";
    data.isExpired = isExpired;
  } else if (type !== "CDI" && endDate) {
    isExpired = restDate(endDate as string);
    data.endDate = endDate;
  }

  const employeeId = formData.get("employeeId") as string;

  try {
    await prisma.contract.update({
      where: { id },
      data: {
        ...data,
        status: isExpired === "Expiré" ? false : true,
        employee: {
          connect: {
            id: employeeId,
          },
        },
      },
    });
    return NextResponse.json({
      message: "La requête à échoué.",
      status: 404,
    });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message: "La requête à échoué",
        error: err,
      }),
      { status: 404 }
    );
  }
}

export async function DELETE(req: NextRequest, { params: { id } }: RouteProps) {
  try {
    const contract = await prisma.contract.delete({
      where: { id: id },
    });
    if (contract.file) {
      const path = join(process.cwd(), "public", "upload", contract.file);
      if (existsSync(path)) {
        unlinkSync(path);
      }
    }
    return new NextResponse("La requête à été exécuté avec succès.", {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message: "La requête à échoué",
        error: err,
      }),
      { status: 404 }
    );
  }
}
