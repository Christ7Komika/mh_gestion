import type { Metadata } from "next";
import Header from "../components/header/Header";
import Menu from "../components/menu/Menu";
export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid grid-cols-layout h-screen ">
      <div className=" relative">
        <div className="bg-white shadow p-2 flex flex-col gap-3 sticky top-0 h-screen">
          <Header />
          <hr className=" border-gray-100" />
          <Menu />
        </div>
      </div>
      <div className="container  max-w-4xl h-full m-auto pt-4">{children}</div>
    </main>
  );
}
