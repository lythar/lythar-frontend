import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNavMobile({
  className,
  items,
  ...props
}: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "flex flex-col  items-center md:space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item, i, arr) => {
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "bg-sidebar w-full h-14 ",
              i === arr.length - 1
                ? "rounded-b-xl border-t-[1px] border-bg-secondary"
                : i === 0
                ? "rounded-t-xl border-b-[1px] border-bg-secondary"
                : ""
            )}
          >
            <div className="flex justify-between items-center h-full px-4 w-full">
              <span className="text-sm font-bold">{item.title}</span>
              <FaArrowRight size={20} />
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
export default SidebarNavMobile;
