import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import env from "@/env";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const password = "MH@2021";
  const username = "MH";
  const role = "ADMIN";
  const hash = bcrypt.hashSync(password, 10);
  const token = jwt.sign(password, env.JWT_SECRET as string);

  try {
    await prisma.user.create({
      data: {
        username: username,
        password: hash,
        token: token,
        role: role,
      },
    });
    return NextResponse.json({
      message: "La requête a été exécuté avec succès",
    });
  } catch (err) {
    console.log({
      message: "La requete a échoué",
      status: 400,
      error: err,
    });
    return NextResponse.json({
      message: "La requete a échoué",
      status: 400,
      error: err,
    });
  }
}
