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
import { useStore } from "../../wrappers/stores-provider";
import { StoreKeys } from "@/types/globals";

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
});

export type ChannelCreateModalValues = z.infer<typeof ChannelCreateModalSchema>;

const ChannelCreateModal: React.FC<ChannelCreateModalProps> = ({}) => {
  const channelStore = useStore(StoreKeys.ChannelStore);
  const form = useForm<ChannelCreateModalValues>({
    resolver: zodResolver(ChannelCreateModalSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: ChannelCreateModalValues) => {
    await channelStore.createChannel(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        <Button type="submit" className="mt-2">
          Stwórz kanał
        </Button>
      </form>
    </Form>
  );
};

export default ChannelCreateModal;