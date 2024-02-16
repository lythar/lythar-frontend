import { cn } from "@/lib/utils";
import React from "react";

const ManagedByOrganizationCannotModify = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<"label">
>(({ className, ...props }, ref) => (
  <div
    ref={ref as any}
    className={cn(
      "bg-popover rounded-md border-2 border-primary my-2 p-2 text-sm text-primary-foreground",
      className
    )}
    {...props}
  >
    <span>
      Twoje konto jest zarządzane przez organizację. Niektóre dane mogą być
      zmienione tylko przez administratora.
    </span>
  </div>
));
ManagedByOrganizationCannotModify.displayName =
  "ManagedByOrganizationCannotModify";

export default ManagedByOrganizationCannotModify;
