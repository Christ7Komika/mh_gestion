import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    await prisma.otherDocumentType.findMany({
      include: { OtherDocument: true },
    })
  );
}

export async function POST(req: Request) {
  const { name } = await req.json();
  if (!name) {
    return NextResponse.json({
      message: "Aucune donnée reçu",
      status: 404,
    });
  }

  try {
    await prisma.otherDocumentType.create({
      data: {
        name: name,
      },
    });
    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json({
      message: "La requête a échoué",
      status: 500,
    });
  }
}
