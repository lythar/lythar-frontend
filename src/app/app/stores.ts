"use client"
import { ChannelStore } from "@/stores/channel-store";
import { OrganizationStore } from "@/stores/organization-store";

export const Stores = [
    new ChannelStore(),
    new OrganizationStore()
]