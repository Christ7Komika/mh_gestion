import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (password && username) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (user) {
      const isValid = bcrypt.compareSync(password, user.password);
      if (isValid) {
        const cookieStore = cookies();
        cookieStore.set(`${user.username}-isAuth`, "1");
        cookieStore.set(`${user.username}-role`, user.role);
        cookieStore.set(`${user.username}-username`, user.username);

        return new Response(
          JSON.stringify({
            username: user.username,
            role: user.role,
          }),
          {
            status: 200,
          }
        );
      }
      return new Response("Identifiants invalides", {
        status: 404,
      });
    }
    return new Response("Identifiants invalides", {
      status: 404,
    });
  }

  return new Response("Veuillez remplir tous les champs", {
    status: 404,
  });
}
