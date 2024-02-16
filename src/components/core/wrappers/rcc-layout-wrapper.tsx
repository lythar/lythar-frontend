"use client";

import { Suspense } from "react";

interface RccLayoutWrapperProps {
  children: React.ReactNode;
}

export default function RccLayoutWrapper({
  children,
}: Readonly<RccLayoutWrapperProps>) {
  return <div className="__RCC_LAYOUT_WRAPPER__">{children}</div>;
}
