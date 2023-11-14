import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import env from "@/env";
export async function GET() {
  return NextResponse.json(await prisma.user.findMany());
}

export async function POST(req: Request) {
  const { username, password, role } = await req.json();
  if (!username || !password || !role) {
    return NextResponse.json({
      message: "Vous avez des champs mmanquant.",
    });
  }
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
    return NextResponse.json({
      message: "La requete a échoué",
      status: 400,
      error: err,
    });
  }
}
