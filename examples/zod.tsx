import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

export function handleSubmit(data: unknown) {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    console.error(parsed.error.format());
  }
}
