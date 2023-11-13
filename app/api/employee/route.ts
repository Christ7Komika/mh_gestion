import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PostEmployee } from "@/types/api/employee";
import { join } from "path";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";

export const employee = {
  id: true,
  firstName: true,
  lastName: true,
  nationality: true,
  gender: true,
  age: true,
  address: true,
  phone: true,
  email: true,
  maritalStatus: true,
  children: true,
  post: true,
  Contract: {},
  Leave: {},
  Sanction: {},
  PayDayAdvance: {},
  PaySlip: {},
  OtherDocument: {},
  createdAt: true,
};

export const employees = {
  id: true,
  firstName: true,
  lastName: true,
  phone: true,
  profil: true,
  post: true,
  Contract: {
    select: {
      type: true,
    },
  },
  Leave: {
    select: {
      status: true,
    },
  },
  Sanction: {
    select: {
      status: true,
    },
  },

  createdAt: true,
};

export async function GET(req: Request) {
  return NextResponse.json({
    employees: await prisma.employee.findMany({
      include: {
        Contract: true,
        Leave: true,
        Sanction: true,
        OtherDocument: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    count: await prisma.employee.count(),
    currentContract: await prisma.employee.count({
      where: {
        Contract: {
          some: {
            status: {
              equals: true,
            },
          },
        },
      },
    }),
    endContract: await prisma.employee.count({
      where: {
        Contract: {
          some: {
            status: {
              equals: false,
            },
          },
        },
      },
    }),
    currentLeave: await prisma.employee.count({
      where: {
        Leave: {
          some: {
            status: {
              equals: true,
            },
          },
        },
      },
    }),
  });
}

export async function POST(req: Request, res: Response) {
  const data = await req.formData();
  const employee: PostEmployee = {
    firstName: data.get("firstName") as string,
    lastName: data.get("lastName") as string,
    gender: data.get("gender") as string,
    post: data.get("post") as string,
  };

  if (data.get("nationality")) {
    employee.nationality = data.get("nationality") as string;
  }
  if (data.get("age")) {
    employee.age = Number(data.get("age") as string);
  }
  if (data.get("address")) {
    employee.address = data.get("address") as string;
  }
  if (data.get("phone")) {
    employee.phone = data.get("phone") as string;
  }
  if (data.get("email")) {
    employee.email = data.get("email") as string;
  }
  if (data.get("maritalStatus")) {
    employee.maritalStatus = data.get("maritalStatus") as string;
  }
  if (data.get("children")) {
    employee.children = Number(data.get("children") as string);
  }

  if (data.get("profil")) {
    const profil = data.get("profil") as File;
    const buffer = Buffer.from(await profil.arrayBuffer());
    if (!existsSync(join(process.cwd(), "public/upload"))) {
      mkdirSync(join(process.cwd(), "public/upload"));
    }
    writeFileSync(join(process.cwd(), "public/upload", profil.name), buffer);
    employee.profil = profil.name;
  }
  try {
    await prisma.employee.create({
      data: { ...employee },
    });
    return NextResponse.json(
      await prisma.employee.findMany({
        select: employees,
      })
    );
  } catch (err) {
    const filename = (data.get("profil") as File).name;
    unlinkSync(join(process.cwd(), "public/upload", filename));
    return NextResponse.json({
      message: "Request failed",
      error: err,
    });
  }
}
