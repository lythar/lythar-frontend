import LytharLogo from "@/public/lythar.svg";
import Image from "next/image";

const HeadlineBranding = () => {
  return (
    <div className="flex gap-4 items-center justify-center w-full h-48">
      <div className="flex items-center justify-center w-16 h-16">
        <Image src={LytharLogo} alt="Lythar logo" />
      </div>
      <h1 className="text-2xl tracking-[8px] font-semibold uppercase text-center">
        Lythar
      </h1>
    </div>
  );
};

export default HeadlineBranding;
