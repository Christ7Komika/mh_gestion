import { parse } from "date-fns";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const today = new Date();
  // Contrat
  const contracts = await prisma.contract.findMany();
  for (const contract of contracts) {
    const startDate = parse(contract.startDate, "yyyy-MM-dd", new Date());
    const endDate = parse(contract.endDate, "yyyy-MM-dd", new Date());
    if (today >= startDate && today <= endDate) {
      // La date d'aujourd'hui est comprise entre startDate et endDate
      await prisma.contract.update({
        where: { id: contract.id },
        data: {
          status: true,
        },
      });
    } else {
      await prisma.contract.update({
        where: { id: contract.id },
        data: {
          status: false,
        },
      });
    }
  }

  // Congés
  const leaves = await prisma.leave.findMany();
  for (const leave of leaves) {
    if (leave.startDate && leave.endDate) {
      const startDate = parse(leave.startDate, "yyyy-MM-dd", new Date());
      const endDate = parse(leave.endDate, "yyyy-MM-dd", new Date());
      if (today >= startDate && today <= endDate) {
        // La date d'aujourd'hui est comprise entre startDate et endDate
        await prisma.leave.update({
          where: { id: leave.id },
          data: {
            status: true,
          },
        });
      } else {
        await prisma.leave.update({
          where: { id: leave.id },
          data: {
            status: false,
          },
        });
      }
    }
  }

  // Sanctions
  const sanctions = await prisma.sanction.findMany();

  for (const sanction of sanctions) {
    if (sanction.startDate && sanction.endDate) {
      const startDate = parse(sanction.startDate, "yyyy-MM-dd", new Date());
      const endDate = parse(sanction.endDate, "yyyy-MM-dd", new Date());
      if (today >= startDate && today <= endDate) {
        // La date d'aujourd'hui est comprise entre startDate et endDate
        await prisma.sanction.update({
          where: { id: sanction.id },
          data: {
            status: true,
          },
        });
      } else {
        await prisma.sanction.update({
          where: { id: sanction.id },
          data: {
            status: false,
          },
        });
      }
    }
  }

  return NextResponse.json({
    contracts: await prisma.contract.findMany(),
    leaves: await prisma.leave.findMany(),
    sanctions: await prisma.sanction.findMany(),
  });
}
