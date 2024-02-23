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

      <p
        className="w-full h-full
        flex items-center justify-center
        text-3xl font-bold text-center
        -translate-y-20
      "
      >
        Wybierz kanał z bocznego menu aby zacząć rozmowę
      </p>
    </div>
  );
};

export default HomePage;
