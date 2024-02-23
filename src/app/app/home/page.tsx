"use client";
import CurrentChannelDisplay from "@/components/core/sidebar/channel/current-channel-display";
import { FC } from "react";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <div className="h-full relative">
      <CurrentChannelDisplay
        currentChannel={{
          channelId: -1,
          name: "Główna",
          createdAt: "0",
          description: "",
        }}
      />

      <p className="h-full flex items-center justify-center text-xl font-bold text-center">
        Wybierz kanał z bocznego menu aby zacząć rozmowę
      </p>
    </div>
  );
};

export default HomePage;
