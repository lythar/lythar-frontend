"use client";
import { useStore } from "@/components/core/wrappers/stores-provider";
import ManagedByOrganizationCannotModify from "@/components/error-messages/ManagedByOrganizationCannotModify";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        <h3 className="text-lg font-medium pt-4 md:pt-0">Konto</h3>
        <p className="text-sm text-muted-foreground">Zarządzaj swoim kontem.</p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Avatar className="h-24 w-24 md:h-20 md:w-20">
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
        <Button onClick={handleAvatarChangeButton} className="w-full md:w-fit">
          <span>Zmień zdjęcie</span>
        </Button>
      </div>
      {hasMadeChanges && (
        <div className="absolute z-20 bottom-20 md:bottom-4 left-0 right-0 mx-auto p-3 md:p-4 flex justify-between items-center bg-popover-secondary w-[95%] md:w-[40rem] rounded-xl border-2 border-solid border-primary">
          <p className="text-xs md:text-normal">Masz nie zapisane zmiany!</p>
          <div className="flex gap-2 items-center">
            <Button
              variant={"ghost"}
              onClick={discardChanges}
              className="h-8 md:h-10 text-xs md:text-normal"
            >
              <span>Anuluj</span>
            </Button>
            <Button
              variant="outline"
              className=" bg-green-600 h-8 md:h-10 text-xs md:text-normal"
              onClick={async () => {
                handleChanges();
              }}
            >
              <span className="text-primary-foreground ">Zapisz zmiany</span>
            </Button>
          </div>
        </div>
      )}
      <Separator />
      <div>
        <h3 className="text-lg font-medium pt-4 md:pt-0">Imię i nazwisko</h3>
        <p className="text-muted-foreground text-sm pb-3">
          Zmiana imienia i nazwiska wymaga kontaktu z administratorem.
        </p>
        <div className="space-y-2">
          <Input
            value={accountStore.get("name")! as string}
            disabled
            className="w-full md:w-fit"
          />
          <Input
            value={accountStore.get("lastName")! as string}
            disabled
            className="w-full md:w-fit"
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium pt-4 md:pt-0">Email</h3>
        <p className="text-muted-foreground text-sm pb-3">
          Zmiana adresu email wymaga kontaktu z administratorem.
        </p>
        <div className="space-y-2">
          <Input
            value={(accountStore.get("email")! as string) || "Brak"}
            disabled
            className="w-full md:w-fit"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
