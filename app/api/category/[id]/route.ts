import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface RouteProps {
  params: { id: string };
}

export async function GET(req: Request, { params: { id } }: RouteProps) {
  return NextResponse.json(
    await prisma.otherDocumentType.findMany({
      where: {
        OtherDocument: {
          some: {
            employeeId: {
              contains: id,
            },
          },
        },
      },
      include: {
        OtherDocument: {
          where: {
            employeeId: {
              contains: id,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    })
  );
}

export async function DELETE(req: Request, { params: { id } }: RouteProps) {
  try {
    await prisma.otherDocumentType.delete({ where: { id: id } });
    return NextResponse.json({
      message: "La requête à été exécuté avec succès",
      status: 200,
    });
  } catch (e) {
    return NextResponse.json({
      message: "La requête à échoué.",
      status: 400,
      error: e,
    });
  }
}
