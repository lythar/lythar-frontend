"use client";
import { useDataLayout } from "@/components/auth/data-layout-context";
import { FC } from "react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  const data = useDataLayout();

  return <div>Dashboard</div>;
};

export default Dashboard;
