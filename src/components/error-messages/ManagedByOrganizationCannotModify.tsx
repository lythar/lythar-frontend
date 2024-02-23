import { cn } from "@/lib/utils";
import React from "react";

const ManagedByOrganizationCannotModify = ({
  className,
}: {
  className: string;
}) => (
  <div
    className={cn(
      "bg-popover rounded-md border-2 border-primary my-2 p-2 text-sm text-primary-foreground",
      className
    )}
  >
    <span>
      Twoje konto jest zarządzane przez organizację. Niektóre dane mogą być
      zmienione tylko przez administratora.
    </span>
  </div>
);

export default ManagedByOrganizationCannotModify;
