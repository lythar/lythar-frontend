"use client";
import SettingsDesktop from "@/components/app/core/settings/settings-desktop";
import { useDeviceContext } from "@/components/device-match-provider";
import { FC } from "react";

interface SettingsPageProps {}

const SettingsPage: FC<SettingsPageProps> = () => {
  const { isMobile } = useDeviceContext();

  if (isMobile) {
    return <></>;
  }

  return (
    <>
      <SettingsDesktop />
    </>
  );
};

export default SettingsPage;
