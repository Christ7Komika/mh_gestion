import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import env from "@/env";
import prisma from "@/lib/prisma";

interface RouteProps {
  params: { id: string };
}

type Data = {
  username?: string;
  password?: string;
  token?: string;
  role?: string;
};

export async function GET(req: Request, { params: { id } }: RouteProps) {
  return NextResponse.json(
    await prisma.user.findUnique({
      where: { id },
    })
  );
}

export async function PUT(req: Request, { params: { id } }: RouteProps) {
  const { username, password, role } = await req.json();
  const data: Data = {};
  if (username) {
    data.username = username;
  }
  if (role) {
    data.role = role;
  }

  if (password) {
    const hash = bcrypt.hashSync(password, 10);
    const token = jwt.sign(password, env.JWT_SECRET as string);
    (data.password = hash), (data.token = token);
  }

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    return NextResponse.json({
      message: "La requête a été exécuté avec succès",
    });
  } catch (err) {
    return NextResponse.json({
      message: "La requete a échoué",
      status: 400,
      error: err,
    });
  }
}

export async function DELETE(req: Request, { params: { id } }: RouteProps) {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      message: "La requete a été exécuté avec succès.",
    });
  } catch (e) {
    return NextResponse.json({
      message: "La requete a échoué.",
      status: 400,
      error: e,
    });
  }
}
