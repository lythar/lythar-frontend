"use client";
import { Icons } from "@/components/ui/icons";
import BaseSidebar from "../sidebar/app-navigation/navigation-sidebar";
import { useGlobalLoading } from "./global-loading-provider";
import HeadlineBranding from "@/components/branding/headline-branding";
import { useDeviceContext } from "@/components/device-match-provider";
import { motion, AnimatePresence } from "framer-motion";
import FramerTransition from "./framer-transition";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
};

const GlobalLoadingProviderRest = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { loading } = useGlobalLoading();
  const { isMobile } = useDeviceContext();

  if (loading) {
    return (
      <div className="container flex flex-col h-screen items-center">
        <HeadlineBranding />
        <div className="fixed h-screen translate-y-[50%] ">
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        </div>
      </div>
    );
  }

  if (isMobile)
    return (
      <div className="flex flex-col-reverse md:flex-row min-h-0 h-[100svh] relative overflow-hidden">
        <BaseSidebar />
        <div className="flex-1">{children}</div>
      </div>
    );

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-0 h-[100svh] relative overflow-hidden">
      <BaseSidebar />
      {/* <AnimatePresence mode="wait">
        <motion.main
          variants={variants}
          initial="hidden"
          animate="enter"
          transition={{ type: "linear" }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence> */}
      <FramerTransition>{children}</FramerTransition>
    </div>
  );
};

export default GlobalLoadingProviderRest;
