// Establece las claves de almacenamiento local para el usuario, la sesión y el balance en una variable constante.

export const STORAGE_KEYS = {
    user: "snail:user",
    session: "snail:session",
    balance: (userId: string) => `snail:balance:${userId}`,
    lastPayment: "snail:lastPayment",
} as const;