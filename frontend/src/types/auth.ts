export interface User {
    id: string;
    fullName: string;
    email: string;
    passwordHash: string;
    createdAt: string;
}

export interface Session {
    userId: string;
    email: string;
    token: string;
    expiresAt: string;
}

export interface AuthContextValue {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    register: (
        fullName: string,
        email: string,
        password: string
    ) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}