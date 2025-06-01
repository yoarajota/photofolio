"use client";

import { usePathname } from "next/navigation";
import Layout from "./_components/Layout";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <Suspense>
      <Layout pathname={pathname}>{children}</Layout>
    </Suspense>
  );
}
