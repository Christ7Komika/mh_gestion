import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PostEmployee } from "@/types/api/employee";

interface RouteProps {
  params: { id: string };
}

export async function GET(req: Request) {
  const id = req.url.split("employee/")[1];
  try {
    const data = await prisma.employee.findUnique({
      where: { id: id },
      include: {
        OtherDocument: {
          include: {
            otherDocumentType: {
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

export async function PUT(req: Request, { params: { id } }: RouteProps) {
  const data: PostEmployee = await req.json();
  try {
    await prisma.employee.update({
      where: { id: id },
      data: { ...data, age: Number(data.age), children: Number(data.children) },
    });

    return NextResponse.json({
      message: "La requête a été exécuté avec succès",
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "La requête a échoué",
      status: 400,
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
