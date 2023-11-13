import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { join } from "path";
import { existsSync, unlinkSync } from "fs";

interface RouteProps {
  params: { id: string };
}

export async function GET(req: Request, { params: { id } }: RouteProps) {
  return NextResponse.json(
    await prisma.otherDocument.findMany({
      where: {
        employee: {
          id,
        },
      },
      include: {
        otherDocumentType: true,
      },
    })
  );
}

export async function DELETE(req: Request, { params: { id } }: RouteProps) {
  try {
    const otherDocument = await prisma.otherDocument.delete({
      where: {
        id: id,
      },
    });
    if (otherDocument.document) {
      const path = join(
        process.cwd(),
        "public",
        "upload",
        otherDocument.document
      );
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
      message: "La requête a échoué.",
      status: 400,
      error: err,
    });
  }
}
