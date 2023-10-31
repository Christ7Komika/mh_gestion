import { restDate } from "@/lib/helpers";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { NextResponse, type NextRequest } from "next/server";
import { join } from "path";

interface RouteProps {
  params: {
    id: string;
  };
}

interface SanctionData {
  file?: string;
  motif?: string;
  status?: boolean;
  startDate?: string;
  endDate?: string;
}

export async function GET(req: NextRequest, { params: { id } }: RouteProps) {
  return NextResponse.json(
    await prisma.sanction.findUnique({
      where: {
        id,
      },
    })
  );
}

export async function PUT(req: NextRequest, { params: { id } }: RouteProps) {
  const data = await req.formData();
  const sanction: SanctionData = {};
  const file = data.get("file") as File | undefined;
  const motif = data.get("motif") as string | undefined;
  const startDate = data.get("startDate");
  const endDate = data.get("endDate");

  // GET LAST FILE
  const oldSanction = await prisma.sanction.findUnique({ where: { id } });

  sanction.motif = motif;

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
    sanction.file = file.name;
  }

  // ADD START DATE
  sanction.startDate = startDate as string;
  // ADD END DATE AND STATUS
  sanction.endDate = endDate as string;
  if (endDate) {
    sanction.status = restDate(endDate as string) === "Expiré" ? false : true;
  }

  try {
    await prisma.sanction.update({
      where: { id },
      data: {
        ...sanction,
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
    const sanction = await prisma.sanction.delete({
      where: { id },
    });

    if (sanction.file) {
      const path = join(process.cwd(), "public", "upload", sanction.file);
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
