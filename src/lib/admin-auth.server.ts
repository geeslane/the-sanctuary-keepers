import { clearSession, getRequestProtocol, getSession, updateSession } from "@tanstack/react-start/server";
import { ADMIN_USERNAME, credentialsMatch } from "@/lib/admin-credentials";

const SESSION_SECRET = "sanctuary-keepers-admin-session-v1";

function sessionConfig() {
  return {
    password: SESSION_SECRET,
    name: "tsk-admin",
    maxAge: 60 * 60 * 24 * 30,
    cookie: {
      httpOnly: true,
      sameSite: "lax" as const,
      path: "/",
      secure: getRequestProtocol() === "https",
    },
  };
}

export async function signInAdminSession(username: string, password: string) {
  if (!(await credentialsMatch(username, password))) return null;
  await updateSession<{ username: string }>(sessionConfig(), { username: ADMIN_USERNAME });
  return ADMIN_USERNAME;
}

export async function readAdminSession() {
  const session = await getSession<{ username?: string }>(sessionConfig());
  return session.data.username === ADMIN_USERNAME ? ADMIN_USERNAME : null;
}

export async function assertAdminSession() {
  const username = await readAdminSession();
  if (!username) throw new Error("Sign in as an administrator.");
  return username;
}

export async function clearAdminSession() {
  await clearSession(sessionConfig());
}
