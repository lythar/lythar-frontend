import { FormEvent, useState } from "react";
import { publicClient } from "@/lib/api-client";
import { Input } from "../ui/input";
import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { useRouter } from "next/navigation";

export default function SetNewPassword({
  login,
  password,
}: {
  login: string;
  password: string;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: login, password: "" });

  const [requirements, setRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target?.name]: e.target?.value });
    if (e.target.name === "password") {
      const isPassing = checkRequirements(e.target.value);
      if (!isPassing) {
        setError("Hasło nie spełnia wymagań");
      } else {
        setError("");
      }
    }
  };

  const checkRequirements = (password: string) => {
    const length = password.length >= 8;
    const lowercase = /[a-z]/.test(password);
    const uppercase = /[A-Z]/.test(password);
    const number = /[0-9]/.test(password);
    const special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    setRequirements({
      length,
      lowercase,
      uppercase,
      number,
      special,
    });

    return length && lowercase && uppercase && number && special;
  };

  const authenticate = async (e: FormEvent) => {
    e.preventDefault();

    const isPassing = checkRequirements(form.password);
    if (!isPassing) {
      setError("Hasło nie spełnia wymagań");
      return;
    }

    setLoading(true);
    setError("");
    const response = await publicClient.POST("/account/api/login", {
      body: {
        login: login,
        password: password,
        newPassword: form.password,
      },
    });

    setLoading(false);
    if (response.error) {
      setError("Wystąpił błąd");
      return;
    } else {
      document.cookie = `token=${response.data?.token}; Path=/; SameSite=Lax; Secure;`;
      localStorage.setItem("token", response.data?.token || "");
      router.push("/app");
    }
  };

  return (
    <form
      className="flex flex-col self-center gap-4 w-96 border-input border-[1px] border-solid p-4 rounded-md"
      onSubmit={authenticate}
    >
      <div className="mb-2">
        <h1 className="text-2xl font-bold">Logowanie</h1>
        <p className="text-sm text-muted-foreground leading-4">
          Wymagane jest stworzenie nowego hasła
        </p>
      </div>

      {error && <div className=" text-red-500 text-sm">{error}</div>}

      <div className="space-y-2">
        <Input
          type="username"
          name="username"
          onChange={handleChange}
          placeholder="Nazwa użytkownika"
          value={form.username}
          autoComplete="off"
          required
        />
        <Input
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="Hasło"
          required
        />
      </div>

      {Object.entries(requirements).map(([key, value]) => {
        if (key === "_HAS_INPUTTED") return;
        return (
          <div key={key} className="flex items-center">
            <div
              className={`h-4 w-4 rounded-full flex items-center justify-center mr-2 ${
                value ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {value ? (
                <Check className="h-3 w-3 text-white" />
              ) : (
                <X className="h-3 w-3 text-white" />
              )}
            </div>
            <p className="text-sm">
              {key === "length"
                ? "Długość co najmniej 8 znaków"
                : key === "lowercase"
                ? "Mała litera"
                : key === "uppercase"
                ? "Duża litera"
                : key === "number"
                ? "Cyfra"
                : key === "special"
                ? "Znak specjalny"
                : ""}
            </p>
          </div>
        );
      })}

      <Button
        aria-disabled={loading}
        disabled={Object.values(requirements).some((v) => !v)}
        type="submit"
        variant="default"
        className="text-white mt-2 h-8"
      >
        {loading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Ustaw hasło"
        )}
      </Button>
    </form>
  );
}
