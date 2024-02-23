"use client";
import SettingsDesktop from "@/components/core/settings/settings-desktop";
import SettingsMobile from "@/components/core/settings/settings-mobile";
import SettingsMobileMiddleware from "@/components/core/settings/settings-mobile-middleware";
import { useDeviceContext } from "@/components/device-provider";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface SettingsPageProps {
  children: React.ReactNode;
}

const SettingsLayout: FC<SettingsPageProps> = ({
  children,
}: SettingsPageProps) => {
  const { isMobile } = useDeviceContext();
  const pathname = usePathname();

  if (isMobile && !pathname.endsWith("settings")) {
    return <SettingsMobileMiddleware>{children}</SettingsMobileMiddleware>;
  } else if (isMobile && pathname.includes("settings")) {
    return <SettingsMobile>{children}</SettingsMobile>;
  }

  return <SettingsDesktop>{children}</SettingsDesktop>;
};

export default SettingsLayout;
