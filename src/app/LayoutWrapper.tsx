"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer/footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideFooter = pathname === "/admin" || pathname === "/admin/dashboard";

  return (
    <>
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}
