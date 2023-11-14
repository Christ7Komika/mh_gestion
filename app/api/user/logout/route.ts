import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface RouteProps {
  params: { id: string };
}
export async function GET(req: Request, { params: { id } }: RouteProps) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return NextResponse.json({
      message: "Aucun utilisateur trouvé",
      status: 400,
    });
  }
  const cookieStore = cookies();
  cookieStore.delete(`${user.username}-isAuth`);
  cookieStore.delete(`${user.username}-role`);
  cookieStore.delete(`${user.username}-username`);

  return NextResponse.json({
    message: "La requete a été exécuté avec succés",
    status: 200,
  });
}
