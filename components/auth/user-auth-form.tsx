import { useRouter } from "next/navigation";
import { useState, FormEvent, FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import { useStrings } from "@/hooks/useStrings";
import loginStrings from "@/strings/login.json";

interface UserAuthFormProps {}

const UserAuthForm: FC<UserAuthFormProps> = () => {
  const s = useStrings(loginStrings);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const authenticate = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { username, password } = input;

    const response = await fetch("/api/auth/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push("/app");
    } else {
      setLoading(false);
      setError(s("LOGIN_ERROR_USERNAME_OR_PASSWORD"));
    }
  };

  return (
    <form
      className="flex flex-col self-center gap-4 w-96 border-input border-[1px] border-solid p-4 rounded-md"
      onSubmit={authenticate}
    >
      <div className="mb-2">
        <h1 className="text-2xl font-bold">{s("LOGIN_HEADER")}</h1>
        <p className="text-sm text-muted-foreground leading-4">
          {s("LOGIN_SUBHEADER")}
        </p>
      </div>

      {error && <div className=" text-red-500 text-sm">{error}</div>}

      <div className="space-y-2">
        <Input
          type="username"
          name="username"
          onChange={handleChange}
          placeholder="Nazwa użytkownika"
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

      <Button
        aria-disabled={loading}
        type="submit"
        variant="default"
        className="text-white mt-2 h-8"
      >
        {loading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Zaloguj"
        )}
      </Button>
    </form>
  );
};

export default UserAuthForm;
