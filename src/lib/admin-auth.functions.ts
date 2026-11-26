import { createMiddleware, createServerFn } from "@tanstack/react-start";

export const requireLocalAdmin = createMiddleware({ type: "function" }).server(async ({ next }) => {
  const { assertAdminSession } = await import("@/lib/admin-auth.server");
  await assertAdminSession();
  return next();
});

const signInAdmin = createServerFn({ method: "POST" })
  .validator((input: { username?: string; password?: string }) => ({
    username: typeof input?.username === "string" ? input.username : "",
    password: typeof input?.password === "string" ? input.password : "",
  }))
  .handler(async ({ data }) => {
    const { signInAdminSession } = await import("@/lib/admin-auth.server");
    const username = await signInAdminSession(data.username, data.password);
    if (!username) throw new Error("That username or password is not correct.");
    return { username };
  });

const getAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const { readAdminSession } = await import("@/lib/admin-auth.server");
  return { username: await readAdminSession() };
});

const signOutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { clearAdminSession } = await import("@/lib/admin-auth.server");
  await clearAdminSession();
  return { ok: true };
});

export { getAdminSession, signInAdmin, signOutAdmin };
