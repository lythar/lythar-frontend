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
      <Link href="/app/settings" passHref>
        <div className="flex items-center justify-between text-sm bg-sidebar w-[35%] py-2 px-3 rounded-xl">
          <ArrowLeft size={16} />
          <span>Ustawienia</span>
        </div>
      </Link>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default SettingsMobileMiddleware;
