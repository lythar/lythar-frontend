"use client"
import { ChannelStore } from "@/stores/channel-store";
import { MessageStore } from "@/stores/message-store";
import { OrganizationStore } from "@/stores/organization-store";

export const Stores = [
    new ChannelStore(),
    new MessageStore(),
    new OrganizationStore()
]