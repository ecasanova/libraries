import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();
  return session ? (
    <>
      <span>{session.user?.email}</span>
      <button onClick={() => signOut()}>Salir</button>
    </>
  ) : (
    <button onClick={() => signIn("github")}>Entrar</button>
  );
}
