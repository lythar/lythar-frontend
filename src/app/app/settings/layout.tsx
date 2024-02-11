"use client";
import SettingsDesktop from "@/components/app/core/settings/settings-desktop";
import SettingsMobile from "@/components/app/core/settings/settings-mobile";
import { useDeviceContext } from "@/components/device-match-provider";

interface SettingsLayoutProps {
  children: Readonly<React.ReactNode>;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = () => {
  const { isMobile } = useDeviceContext();

  if (isMobile) {
    return <SettingsMobile />;
  }

  return <SettingsDesktop />;
};

export default SettingsLayout;
