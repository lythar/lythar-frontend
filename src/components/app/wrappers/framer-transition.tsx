import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const FramerTransition = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const key = usePathname();

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={key}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FramerTransition;
