import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface SettingsMobileMiddlewareProps {
  children: React.ReactNode;
}

const SettingsMobileMiddleware: FC<SettingsMobileMiddlewareProps> = ({
  children,
}) => {
  return (
    <div className="p-6 pb-16">
      <Link href="/app/settings" passHref className="pb-4">
        <div className="flex items-center text-sm gap-2 bg-sidebar w-fit py-1 px-2 rounded-xl">
          <ArrowLeft size={16} />
          <span>Ustawienia</span>
        </div>
      </Link>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default SettingsMobileMiddleware;
