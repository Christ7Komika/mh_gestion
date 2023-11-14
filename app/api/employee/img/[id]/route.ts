import { uploadPath } from "@/lib/host";
import prisma from "@/lib/prisma";
import { tr } from "date-fns/locale";
import { existsSync, unlinkSync, writeFileSync } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";

interface RouteProps {
  params: {
    id: string;
  };
}

export async function PUT(req: Request, { params: { id } }: RouteProps) {
  const data = await req.formData();
  const employee = await prisma.employee.findFirst({ where: { id } });
  const profil = data.get("profil") as File | null;

  if (employee?.profil) {
    const path = join(uploadPath, employee.profil);
    if (existsSync(path)) {
      unlinkSync(path);
    }
  }
  try {
    if (profil) {
      const buffer = Buffer.from(await profil.arrayBuffer());
      writeFileSync(join(uploadPath, profil.name), buffer);
      await prisma.employee.update({
        where: { id },
        data: { profil: profil.name },
      });
      return NextResponse.json({
        message: "La requête a été éxécuté avec succès",
        status: 200,
      });
    } else {
      await prisma.employee.update({
        where: { id },
        data: { profil: null },
      });
      return NextResponse.json({
        message: "La requête a été éxécuté avec succès",
        status: 200,
      });
    }
  } catch (err) {
    return NextResponse.json({
      message: "La requête a échoué",
      status: 400,
      error: err,
    });
  }
}
