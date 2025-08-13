import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

export default function ZodExample() {
  const result = schema.safeParse({ email: "correo" });
  return <pre>{JSON.stringify(result, null, 2)}</pre>;
}
