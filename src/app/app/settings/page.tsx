"use client";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";
import AccountSettings from "./account/page";

interface SettingsPageProps {}

const SettingsPage: FC<SettingsPageProps> = () => {
  return <AccountSettings />;
};

export default SettingsPage;
