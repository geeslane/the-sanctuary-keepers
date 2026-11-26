const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";

async function digest(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return new Uint8Array(bytes);
}

async function sameSecret(left: string, right: string) {
  const [a, b] = await Promise.all([digest(left), digest(right)]);
  let diff = 0;
  for (let index = 0; index < a.length; index += 1) diff |= a[index] ^ b[index];
  return diff === 0;
}

export async function credentialsMatch(username: string, password: string) {
  const userOk = await sameSecret(username.trim(), ADMIN_USERNAME);
  const passOk = await sameSecret(password, ADMIN_PASSWORD);
  return userOk && passOk;
}

export { ADMIN_USERNAME };
