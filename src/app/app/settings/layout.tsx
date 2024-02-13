"use client";
import SettingsDesktop from "@/components/app/core/settings/settings-desktop";
import SettingsMobile from "@/components/app/core/settings/settings-mobile";
import { useDeviceContext } from "@/components/device-match-provider";
import { FC } from "react";

interface SettingsPageProps {
  children: React.ReactNode;
}

const SettingsLayout: FC<SettingsPageProps> = ({
  children,
}: SettingsPageProps) => {
  const { isMobile } = useDeviceContext();

  if (isMobile) {
    return <SettingsMobile>{children}</SettingsMobile>;
  }

  return <SettingsDesktop>{children}</SettingsDesktop>;
};

export default SettingsLayout;
