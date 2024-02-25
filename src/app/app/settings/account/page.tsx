"use client";
import { useStore } from "@/components/core/wrappers/stores-provider";
import ManagedByOrganizationCannotModify from "@/components/error-messages/ManagedByOrganizationCannotModify";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { getInitials } from "@/lib/utils";
import Account from "@/stores/objects/Account";
import { StoreKeys } from "@/types/globals";
import { FC, useEffect, useState } from "react";

interface SettingsPageProps {}

const AccountSettings: FC<SettingsPageProps> = () => {
  const accountStore = useStore(StoreKeys.AccountStore);
  const { toast } = useToast();
  const [hasMadeChanges, setHasMadeChanges] = useState(false);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);

  const handleAvatarChangeButton = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = false;
    input.accept = "image/png, image/jpeg, image/jpg, image/webp";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setNewAvatar(file);
      }
    };

    input.click();
    input.remove();
  };

  const handleError = (error: Error) => {
    console.log("TEST");
    toast({
      title: "Wystąpił błąd",
      description: error.message,
      variant: "destructive",
    });
  };

  const uploadAvatar = async () => {
    if (newAvatar) {
      const avatarBuffer = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target?.result as string);
        };
        reader.readAsArrayBuffer(newAvatar);
      });

      const ext = newAvatar.name.split(".").at(-1);

      const res = await Account.updateAvatar(avatarBuffer, ext!).catch(
        handleError
      );
      if (typeof res == "object") accountStore.setAvatar(res.avatarUrl!);
      setNewAvatar(null);
    }
  };

  const handleChanges = async () => {
    if (hasMadeChanges) {
      await uploadAvatar();
    }

    setHasMadeChanges(false);
  };

  const discardChanges = () => {
    setNewAvatar(null);
    setHasMadeChanges(false);
  };

  useEffect(() => {
    if (newAvatar) {
      setHasMadeChanges(true);
    }
  }, [newAvatar, hasMadeChanges]);

  const getPreview = () => {
    if (newAvatar) {
      return URL.createObjectURL(newAvatar);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <ManagedByOrganizationCannotModify />
        <h3 className="text-lg font-medium">Konto</h3>
        <p className="text-sm text-muted-foreground">Zarządzaj swoim kontem.</p>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={
              newAvatar
                ? getPreview()
                : `http://${process.env.NEXT_PUBLIC_API_URL}${accountStore.get(
                    "avatarUrl"
                  )}`
            }
            alt="avatar"
          />
          <AvatarFallback>
            {getInitials(
              `${accountStore.get("name")}${accountStore.get("lastName")}`
            )}
          </AvatarFallback>
        </Avatar>
        <Button onClick={handleAvatarChangeButton}>
          <span className="text-primary-foreground">Zmień zdjęcie</span>
        </Button>
      </div>
      {hasMadeChanges && (
        <div className="absolute z-20 bottom-4 left-0 right-0 p-4 flex justify-between items-center bg-popover-secondary w-[40rem] mx-auto rounded-xl">
          <p>Masz nie zapisane zmiany!</p>
          <div className="flex gap-2">
            <Button variant={"ghost"} onClick={discardChanges}>
              <span className="text-primary-foreground">Anuluj</span>
            </Button>
            <Button
              variant="outline"
              className=" bg-green-600"
              onClick={async () => {
                handleChanges();
              }}
            >
              <span className="text-primary-foreground">Zapisz zmiany</span>
            </Button>
          </div>
        </div>
      )}
      <Separator />
    </div>
  );
};

export default AccountSettings;
