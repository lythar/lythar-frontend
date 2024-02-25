"use client";
import { useSettings } from "@/components/core/wrappers/settings-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

interface AppearenceSettingsProps {}

const AppearanceSettings: React.FC<AppearenceSettingsProps> = () => {
  const { settings, setSettings } = useSettings();
  const { setTheme, theme } = useTheme();

  const parseThemeName = (theme: string) => {
    switch (theme) {
      case "system":
        return "Systemowy";
      case "light":
        return "Jasny";
      case "dark":
        return "Ciemny";
      default:
        return "Systemowy";
    }
  };

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-medium">Wygląd</h3>
      </div>

      <div className="md:px-2 space-y-6">
        <div className="space-y-2">
          <div>
            <h4 className="text-base font-medium">Motyw</h4>
            <p className="text-sm text-muted-foreground">
              Wybierz preferowany motyw kolorystyczny.
            </p>
          </div>

          <Select onValueChange={handleThemeChange}>
            <SelectTrigger className="bg-popover-secondary h-10 md:h-8 w-full md:w-40">
              <SelectValue placeholder={parseThemeName(theme || "system")} />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="system">Systemowy</SelectItem>
              <SelectItem value="light">Jasny</SelectItem>
              <SelectItem value="dark">Ciemny</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 flex items-center justify-between">
          <div>
            <h4 className="text-base font-medium">
              Pokaż klatki na sekundę [Wymaga Restartu]
            </h4>
            <p className="text-sm text-muted-foreground">
              Pokazuj liczbę klatek na sekundę.
            </p>
          </div>
          <Switch
            checked={settings.drawFps}
            onCheckedChange={(checked) =>
              setSettings({ ...settings, drawFps: checked })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
