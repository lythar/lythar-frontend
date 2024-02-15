"use client";
import SettingsDesktop from "@/components/app/core/settings/settings-desktop";
import SettingsMobile from "@/components/app/core/settings/settings-mobile";
import SettingsMobileMiddleware from "@/components/app/core/settings/settings-mobile-middleware";
import { useDeviceContext } from "@/components/device-provider";
import { useParams, usePathname } from "next/navigation";
import { FC } from "react";

interface SettingsPageProps {
  children: React.ReactNode;
  params?: any;
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
