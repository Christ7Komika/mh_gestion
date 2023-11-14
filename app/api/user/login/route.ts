import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username) {
    return NextResponse.json({
      message: "Veuillez inserer le nom de l'utilisateur",
      status: 400,
    });
  }
  if (!password) {
    return NextResponse.json({
      message: "Veuillez inserer le mot de passe de l'utilisateur",
      status: 400,
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return NextResponse.json({
      message: "Identifiants invalides",
      status: 404,
    });
  }

  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) {
    return NextResponse.json({
      message: "Identifiants invalides",
      status: 404,
    });
  }

  const cookieStore = cookies();
  cookieStore.set("isAuth", "1");
  cookieStore.set("role", user.role);
  cookieStore.set("username", user.username);
  return NextResponse.json({
    username: user.username,
    role: user.role,
  });
}
