"use client";
import { Icons } from "@/components/ui/icons";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/app/home");
  });

  return (
    <div className="container w-full h-full flex items-center">
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
    </div>
  );
};

export default Dashboard;
