import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, Session, AuthContextValue } from "../types/auth";
import * as authService from "../services/authService";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const session = authService.getSession();

        if (session) {
            const currentUser = authService.getCurrentUser();

            if (currentUser) {
                setUser(currentUser);
                setSession(session);
            }
        }

        setIsLoading(false);
    }, []);

    async function register(fullName: string, email: string, password: string) {
        const result = await authService.register(fullName, email, password);

        setUser(result.user);
        setSession(result.session);
    }

    async function login(email: string, password: string) {
        const result = await authService.login(email, password);
        setUser(result.user);
        setSession(result.session);
    }

    function logout() {
        authService.logout();
        setUser(null);
        setSession(null);
    }

    return (
        <AuthContext.Provider value={{ user, session, isLoading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// hook que cualquier componente usa para leer el estado de auth
export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }
    return context;
}