"use client";
import { FC } from "react";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <div className="h-full relative">
      <p className="h-full flex items-center justify-center text-xl font-bold text-center">
        Wybierz grupę z bocznego menu aby zacząć rozmowę
      </p>
    </div>
  );
};

export default HomePage;
