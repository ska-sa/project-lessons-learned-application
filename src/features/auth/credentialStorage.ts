const CREDENTIAL_KEY = "sarao_rt_auth";

export interface User {
  id: string;
  name: string;
  role: string;
  isAdmin?: boolean;
}

export function storeCredentials(authData: { token: string; user: User }) {
  try {
    const secureData = {
      token: authData.token,
      user: {
        id: authData.user.id,
        name: authData.user.name,
        role: authData.user.role,
      },
      timestamp: Date.now(),
    };
    localStorage.setItem(CREDENTIAL_KEY, JSON.stringify(secureData));
  } catch (error) {
    console.error("Failed to store credentials", error);
  }
}

interface StoredCredentials {
  token: string;
  user: User;
  timestamp: number;
}

export function getCredentials(): StoredCredentials | null {
  try {
    const data = localStorage.getItem(CREDENTIAL_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to retrieve credentials", error);
    return null;
  }
}

export function clearCredentials() {
  localStorage.removeItem(CREDENTIAL_KEY);
}

// auto expr
const MAX_SESSION_AGE = 1000 * 60 * 60 * 8; // 8 hours
const savedCredentials = getCredentials();
if (
  savedCredentials &&
  Date.now() - savedCredentials.timestamp > MAX_SESSION_AGE
) {
  clearCredentials();
}
