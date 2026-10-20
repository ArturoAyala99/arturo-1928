import { STORAGE_KEYS } from "../constants/storageKeys";
import { hashPassword } from "../utils/hash";
import type { User, Session } from "../types/auth";

const SESSION_DURATION = 1000 * 60 * 60 * 24; // 24 hours in milliseconds
// Cambiar a 60000 (1 minuto) para probar la expiración

// funciones internas
function getUser(): User | null {
  const userStorage = localStorage.getItem(STORAGE_KEYS.user);
  
    if (!userStorage) return null;

    try {
        return JSON.parse(userStorage) as User;

    } catch {
        return null;
    }
}

function createSession(userId: string, email: string): Session {
    return {
        userId,
        email,
        token: crypto.randomUUID(),
        expiresAt: new Date(Date.now() + SESSION_DURATION).toISOString(),
    };
}

// funciones públicas
export async function register(fullName: string, email: string, password: string): Promise<{ user: User; session: Session }> {
    const existing = getUser();
    const normalizedEmail = email.trim().toLowerCase();

    if (existing && existing.email === normalizedEmail) {
        throw new Error("El correo electrónico ya está registrado.");
    }

    const passwordHash = await hashPassword(password);

    const user: User = {
        id: crypto.randomUUID(), 
        fullName: fullName.trim(), 
        email: normalizedEmail, 
        passwordHash, 
        createdAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.balance(user.id), String(0));

    const session = createSession(user.id, user.email);
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));

    return { user, session };
}

export async function login(email: string, password: string): Promise<{ user: User; session: Session }> {
    const user = getUser();
    const normalizedEmail = email.trim().toLowerCase();

    if (!user || user.email !== normalizedEmail) {
        throw new Error("Credenciales inválidas.");
    }

    const passwordHash = await hashPassword(password);

    if (passwordHash !== user.passwordHash) {
        throw new Error("Credenciales inválidas.");
    }

    const session = createSession(user.id, user.email);
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));

    return { user, session };
}

export function logout(): void {
    localStorage.removeItem(STORAGE_KEYS.session);
}

export function getSession(): Session | null {
    const sessionStorage = localStorage.getItem(STORAGE_KEYS.session);

    if (!sessionStorage) return null;

    try {
        const session = JSON.parse(sessionStorage) as Session;

        if (new Date(session.expiresAt) <= new Date()) {
            localStorage.removeItem(STORAGE_KEYS.session);
            return null;
        }

        return session;
    } catch {
        return null;
    }
}

export function getCurrentUser(): User | null {
    const session = getSession();

    if (!session) return null;

    const user = getUser();

    if (!user || user.id !== session.userId) return null;

    return user;
}