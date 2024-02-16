"use client";
import ManagedByOrganizationCannotModify from "@/components/error-messages/ManagedByOrganizationCannotModify";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";

interface SettingsPageProps {}

const AccountSettings: FC<SettingsPageProps> = () => {
  return (
    <div className="space-y-6">
      <div>
        <ManagedByOrganizationCannotModify />
        <h3 className="text-lg font-medium">Konto</h3>
        <p className="text-sm text-muted-foreground">Zarządzaj swoim kontem.</p>
      </div>
      <Separator />
    </div>
  );
};

export default AccountSettings;
