import HeadlineBranding from "@/components/branding/headline-branding";
import { Icons } from "@/components/ui/icons";

export default function LoadingOverlayFallback() {
  return (
    <div
      className={`fixed w-screen h-screen bg-background z-[999] flex flex-col items-center`}
    >
      <HeadlineBranding />
      <div className="fixed h-screen translate-y-[50%] ">
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      </div>
    </div>
  );
}
