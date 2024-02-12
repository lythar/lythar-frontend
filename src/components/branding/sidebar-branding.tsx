import Image from "next/image";

const SidebarBranding = () => {
  return (
    <div className="center w-full">
      <Image
        src="/lythar_no_bg.svg"
        className="h-8"
        alt="Lythar logo"
        width={50}
        height={50}
      />
    </div>
  );
};

export default SidebarBranding;
