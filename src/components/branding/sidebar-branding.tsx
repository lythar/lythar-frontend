import LytharLogo from "@/public/lythar_no_bg.svg"
import Image from "next/image";

const SidebarBranding = () => {
  return (
    <div className="center w-full">
        <Image src={LytharLogo} className="h-8" alt="Lythar logo" />
    </div>
  );
};

export default SidebarBranding;
