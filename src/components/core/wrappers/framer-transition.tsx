import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const FramerTransition = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const key = usePathname();

  // Prevents from rendering an animation when the subroute changes ie. /app/1 to /app/2
  const subrouteClearedPath = (
    isNaN((key.split("").at(-1) as any) * -1)
      ? key
      : key
          .split("/")
          .filter((_, i, a) => i < a.length - 1)
          .join("/")
  ).replace(/\/?$/g, "/");

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={subrouteClearedPath}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FramerTransition;
