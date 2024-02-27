"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Channel from "@/stores/objects/Channel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../../wrappers/stores-provider";
import { StoreKeys } from "@/types/globals";
import { Channel as TChannel } from "@/types/globals";
import { Switch } from "@/components/ui/switch";

interface ChannelCreateModalProps {}

const ChannelCreateModalSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nazwa kanału musi mieć co najmniej 3 znaki" })
    .max(30, { message: "Nazwa kanału nie może mieć więcej niż 30 znaków" }),
  description: z
    .string()
    .min(3, { message: "Opis kanału musi mieć co najmniej 3 znaki" })
    .max(100, { message: "Opis kanału nie może mieć więcej niż 100 znaków" }),
  isDirectMessages: z.boolean().default(false),
  isPublic: z.boolean().default(true),
  members: z.array(z.number()).default([]).nullish(),
});

export type ChannelCreateModalValues = z.infer<typeof ChannelCreateModalSchema>;

const ChannelCreateModal: React.FC<ChannelCreateModalProps> = () => {
  const channelStore = useStore(StoreKeys.ChannelStore);
  const userStore = useStore(StoreKeys.UserStore);
  const users = Object.entries(userStore.getAll());
  const [userSearch, setUserSearch] = useState<string>("");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<ChannelCreateModalValues>({
    resolver: zodResolver(ChannelCreateModalSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: ChannelCreateModalValues) => {
    const channelExists = Object.values(channelStore.getAll()).find(
      (channel) => channel.name === data.name
    );

    if (channelExists) {
      form.setError("name", {
        type: "manual",
        message: "Kanał o tej nazwie już istnieje",
      });
      return;
    }

    const serverResponse = await Channel.createChannel(data);
    channelStore.set(serverResponse.channelId!, serverResponse as TChannel);
    router.push(`/app/home/${serverResponse.channelId}`);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="w-full text-foreground-variant font-semibold flex items-center justify-between md:h-8 px-1 select-none">
        <span>Kanały</span>
        <DialogTrigger asChild>
          <button>
            <Plus size={20} />
          </button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa kanału</FormLabel>
                  <FormControl>
                    <Input placeholder="nowy-kanal" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis kanału</FormLabel>
                  <FormControl>
                    <Input placeholder="Opis kanału" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex w-full justify-between items-center gap-2">
                  <FormLabel>Publiczny</FormLabel>
                  <FormControl className="!mt-0">
                    <Switch
                      className="mt-0"
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("isPublic") ? null : (
              <FormField
                control={form.control}
                name="members"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Użytkownicy</FormLabel>
                      <FormControl>
                        <>
                          <Input
                            placeholder="Wyszukaj użytkownika"
                            value={userSearch}
                            onChange={(e) => setUserSearch(e.target.value)}
                            required
                          />
                          <div className="mt-4 py-2 ">
                            {userSearch.length > 0 && (
                              <div className="space-y-2 rounded-md bg-sidebar p-3 ">
                                {users
                                  .filter(
                                    ([, user]) =>
                                      user.name
                                        .toLowerCase()
                                        .includes(userSearch.toLowerCase()) ||
                                      user.lastName
                                        ?.toLowerCase()
                                        .includes(userSearch.toLowerCase())
                                  )
                                  .map(([userId, user]) => (
                                    <div
                                      key={userId}
                                      className="flex items-center justify-between max-h-[300px] overflow-y-scroll overflow-x-hidden"
                                    >
                                      <span>
                                        {user.name +
                                          " " +
                                          (user.lastName || "")}
                                      </span>
                                      <Switch
                                        checked={field.value?.includes(+userId)}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            field.onChange([
                                              ...(field.value || []),
                                              +userId,
                                            ]);
                                          } else {
                                            field.onChange(
                                              field.value?.filter(
                                                (id) => id !== +userId
                                              )
                                            );
                                          }
                                        }}
                                      />
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}

            <Button type="submit" className="mt-2">
              Stwórz kanał
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelCreateModal;
