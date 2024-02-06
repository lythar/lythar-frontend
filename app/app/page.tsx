"use client";
import { Icons } from "@/components/ui/icons";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  const router = useRouter();

  router.push("/app/home");

  return (
    <div className="container">
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
    </div>
  );
};

export default Dashboard;
