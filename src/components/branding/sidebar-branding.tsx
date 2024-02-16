import Image from "next/image";

const SidebarBranding = () => {
  return (
    <Image
      src="/lythar_no_bg.svg"
      className="h-10 mt-1"
      alt="Lythar logo"
      width={75}
      height={75}
      priority
    />
  );
};

export default SidebarBranding;
