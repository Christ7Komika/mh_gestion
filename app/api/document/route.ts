import prisma from "@/lib/prisma";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";

interface OtherDocument {
  documentNameId: string;
  employeeId: string;
  document?: string;
  startDate?: string;
  endDate?: string;
  comment?: string;
}

export async function POST(req: Request, res: Response) {
  const formData = await req.formData();
  const data: OtherDocument = {
    documentNameId: formData.get("documentNameId") as string,
    employeeId: formData.get("employeeId") as string,
    startDate: formData.get("startDate") as string,
    endDate: formData.get("endDate") as string,
    comment: formData.get("comment") as string,
  };

  const document = formData.get("document") as File;
  if (document) {
    const file = Buffer.from(await document.arrayBuffer());
    if (!existsSync(join(process.cwd(), "public/upload"))) {
      mkdirSync(join(process.cwd(), "public/upload"));
    }
    writeFileSync(join(process.cwd(), "public/upload", document.name), file);
    data.document = document.name;
  }

  try {
    await prisma.otherDocument.create({
      data: {
        document: data.document as string,
        comment: data.comment,
        startDate: data.startDate,
        endDate: data.endDate,
        employee: {
          connect: {
            id: data.employeeId,
          },
        },
        otherDocumentType: {
          connect: {
            id: data.documentNameId,
          },
        },
      },
    });
  } catch (err) {
    const path = join(process.cwd(), "public/upload", document.name);
    unlinkSync(path);
    return NextResponse.json({
      message: "La requête à échoué.",
      err: err,
    });
  }
  console.log(data);
  return NextResponse.json(data);
}
