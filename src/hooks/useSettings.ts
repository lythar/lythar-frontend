import { Settings } from "@/types/globals";
import { useLocalStorage } from "./useLocalStorage";

export default function useSettings() {
  const [settings, setSettings] = useLocalStorage<Settings>("settings", {
    useStackedSidebar: false,
    drawFps: false,
  });

  return { settings, setSettings } as {
    settings: Settings;
    setSettings: (settings: Settings) => void;
  };
}
