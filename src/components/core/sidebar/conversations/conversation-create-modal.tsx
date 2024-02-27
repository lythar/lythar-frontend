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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

interface ConversationCreateModalProps {}

const ConversationCreateModalSchema = z.object({
  name: z.string().nullish(),
  description: z.string().default(""),
  isDirectMessages: z.boolean().default(true),
  isPublic: z.boolean().default(false),
  members: z.array(z.number()).default([]),
});

export type ConversationCreateModalValues = z.infer<
  typeof ConversationCreateModalSchema
>;
/**
 * @TODO LAST DAY BUT FIX THIS PLS UGH~~
 */

const ConversationCreateModal: React.FC<ConversationCreateModalProps> = () => {
  const channelStore = useStore(StoreKeys.ChannelStore);
  const accountStore = useStore(StoreKeys.AccountStore);
  const userStore = useStore(StoreKeys.UserStore);
  const users = Object.entries(userStore.getAll());
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [userSearch, setUserSearch] = useState<string>("");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<ConversationCreateModalValues>({
    resolver: zodResolver(ConversationCreateModalSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: ConversationCreateModalValues) => {
    const channelExists = Object.values(channelStore.getAll()).find(
      (channel) =>
        channel.members.length === 2 &&
        channel.members.includes(+accountStore.get("id")!) &&
        channel.members.includes(selectedUser!)
    );

    if (channelExists) {
      router.push(`/app/home/dm-${channelExists.channelId}`);
      setSelectedUser(null);
      setUserSearch("");
      setIsOpen(false);
      return;
    }

    const targetUser = userStore.get(selectedUser || 0);
    if (!targetUser) return;
    data.name = `${targetUser.lastName?.substring(0, 3)}-${
      targetUser.id
    }-${accountStore
      .get("lastName")
      ?.toString()
      .substring(0, 3)}-${accountStore.get("id")}`;
    data.members = [targetUser.id, selectedUser!];
    const serverResponse = await Channel.createChannel(data as TChannel);
    channelStore.set(serverResponse.channelId!, serverResponse as TChannel);
    router.push(`/app/home/dm-${serverResponse.channelId}`);
    setSelectedUser(null);
    setUserSearch("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="w-full text-foreground-variant font-semibold flex items-center justify-between md:h-8 select-none">
        <span>Konwersacje</span>
        <DialogTrigger asChild>
          <button>
            <Plus size={20} />
          </button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, console.error)}
            className="space-y-4"
          >
            {form.watch("isPublic") ? null : (
              <>
                {selectedUser !== null && (
                  <FormField
                    control={form.control}
                    name="members"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Obecnie wybrano{" "}
                          <span className="font-bold text-accent">
                            {`${userStore.get(selectedUser || 0).name} ${
                              userStore.get(selectedUser || 0).lastName || ""
                            }`}
                          </span>
                        </FormLabel>
                        <Button
                          className="ml-2 h-8 py-1"
                          variant={"destructive"}
                          onClick={() => {
                            field.value?.filter((id) => id !== selectedUser);
                            setSelectedUser(null);
                          }}
                        >
                          Usuń
                        </Button>
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="members"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Użytkownik</FormLabel>
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
                                <div className="space-y-[1px] overflow-y-scroll overflow-x-hidden max-h-[300px] rounded-md bg-sidebar p-3 ">
                                  {users
                                    .filter(
                                      ([, user]) =>
                                        (user.name
                                          .toLowerCase()
                                          .includes(userSearch.toLowerCase()) ||
                                          user.lastName
                                            ?.toLowerCase()
                                            .includes(
                                              userSearch.toLowerCase()
                                            )) &&
                                        accountStore.get("id") !== user.id
                                    )
                                    .map(([userId, user], i) =>
                                      i > 20 ? null : (
                                        <div
                                          key={userId}
                                          onClick={() => {
                                            setSelectedUser(+userId);
                                            field.onChange([
                                              ...(field.value || []),
                                              +userId,
                                            ]);
                                          }}
                                          className="flex items-center transition-colors duration-100 ease-out-expo rounded-md hover:bg-background px-2 py-1 gap-4 "
                                        >
                                          <Avatar>
                                            <AvatarImage
                                              src={user.avatarUrl || ""}
                                              alt={user.name}
                                            />
                                            <AvatarFallback>
                                              {getInitials(
                                                `${user.name} ${user.lastName}`
                                              )}
                                            </AvatarFallback>
                                          </Avatar>
                                          <span>
                                            {user.name +
                                              " " +
                                              (user.lastName || "")}
                                          </span>
                                        </div>
                                      )
                                    )}
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
              </>
            )}

            <Button type="submit" className="mt-2">
              Stwórz konwersację
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ConversationCreateModal;
