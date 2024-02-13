"use client";
import { FC } from "react";
import { FaBellSlash } from "react-icons/fa6";

interface ActivityPageProps {}

const ActivityPage: FC<ActivityPageProps> = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 text-primary-foreground">
      <FaBellSlash size={100} />
      <span>Wygląda na to, że nie masz żadnych powiadomień.</span>
    </div>
  );
};

export default ActivityPage;
