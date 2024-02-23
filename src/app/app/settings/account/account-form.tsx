import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const accountFormSchema = z.object({});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function ProfileForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: AccountFormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}></form>
    </Form>
  );
}
