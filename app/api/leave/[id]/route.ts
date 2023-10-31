import { restDate } from "@/lib/helpers";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { NextResponse, type NextRequest } from "next/server";
import { join } from "path";

interface RouteProps {
  params: {
    id: string;
  };
}

interface LeaveData {
  file?: string;
  motif?: string;
  status?: boolean;
  startDate?: string;
  endDate?: string;
}

export async function GET(req: NextRequest, { params: { id } }: RouteProps) {
  return NextResponse.json(
    await prisma.leave.findUnique({
      where: {
        id,
      },
    })
  );
}

export async function PUT(req: NextRequest, { params: { id } }: RouteProps) {
  const data = await req.formData();
  const leave: LeaveData = {};
  const file = data.get("file") as File | undefined;
  const motif = data.get("motif") as string | undefined;
  const startDate = data.get("startDate");
  const endDate = data.get("endDate");

  // GET LAST FILE
  const oldLeave = await prisma.leave.findUnique({ where: { id } });

  leave.motif = motif;

  if (file) {
    if (oldLeave?.file) {
      const path = join(process.cwd(), "public", "upload", oldLeave?.file);
      unlinkSync(path);
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const path = join(process.cwd(), "public", "upload");
    if (!existsSync(path)) {
      mkdirSync(path);
    }
    writeFileSync(join(path, file.name), buffer);
    leave.file = file.name;
  }

  // ADD START DATE
  leave.startDate = startDate as string;
  // ADD END DATE AND STATUS
  leave.endDate = endDate as string;
  if (endDate) {
    leave.status = restDate(endDate as string) === "Expiré" ? false : true;
  }

  try {
    await prisma.leave.update({
      where: { id },
      data: {
        ...leave,
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
    const leave = await prisma.leave.delete({
      where: { id },
    });

    if (leave.file) {
      const path = join(process.cwd(), "public", "upload", leave.file);
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
