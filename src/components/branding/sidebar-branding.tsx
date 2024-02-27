import { useTheme } from "next-themes";
import Image from "next/image";

const SidebarBranding = () => {
  const { theme } = useTheme();

  return (
    <Image
      src={
        theme == "dark" || theme == "system"
          ? "/lythar_no_bg.svg"
          : "/lythar_no_bg_light_mode.svg"
      }
      className="h-10 mt-1"
      alt="Lythar logo"
      width={75}
      height={75}
      priority
    />
  );
};

export default SidebarBranding;
