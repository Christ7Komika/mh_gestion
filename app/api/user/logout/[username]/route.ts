import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface RouteProps {
  params: { username: string };
}
export async function GET(req: Request, { params: { username } }: RouteProps) {
  const cookieStore = cookies();
  cookieStore.delete(`${username}-isAuth`);
  cookieStore.delete(`${username}-role`);
  cookieStore.delete(`${username}-username`);

  return NextResponse.json({
    message: "La requete a été exécuté avec succés",
    status: 200,
  });
}
