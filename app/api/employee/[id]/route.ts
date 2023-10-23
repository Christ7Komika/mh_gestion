import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const id = req.url.split("employee/")[1];
  try {
    const data = await prisma.employee.findUnique({
      where: { id: id },
      include: {
        OtherDocument: {
          include: {
            OtherDocumentType: {
              select: { name: true },
            },
          },
        },
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({
      message: "La requete a échoué",
      error: err,
    });
  }
}

export async function DELETE(req: Request) {
  const id = req.url.split("employee/")[1];
  try {
    await prisma.employee.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json("");
  } catch (err) {
    return NextResponse.json({
      message: "La requete a échoué",
      error: err,
    });
  }
}
