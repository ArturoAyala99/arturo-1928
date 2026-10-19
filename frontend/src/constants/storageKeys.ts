export const STORAGE_KEYS = {
    user: "snail:user",
    session: "snail:session",
    balance: (userId: string) => `snail:balance:${userId}`
} as const;