import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username) {
    NextResponse.json({
      message: "Veuillez inserer le nom de l'utilisateur",
      status: 400,
    });
    return;
  }
  if (!password) {
    NextResponse.json({
      message: "Veuillez inserer le mot de passe de l'utilisateur",
      status: 400,
    });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    NextResponse.json({
      message: "Identifiants invalides",
      status: 404,
    });
    return;
  }

  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) {
    NextResponse.json({
      message: "Identifiants invalides",
      status: 404,
    });
    return;
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
