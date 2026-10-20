import { STORAGE_KEYS } from "../constants/storageKeys";
import type { LastPayment } from "../types/snailpay";

export const saveLastPayment = (payment: LastPayment): void => {
    localStorage.setItem(STORAGE_KEYS.lastPayment, JSON.stringify(payment));
}

export const getLastPayment = (): LastPayment | null => {
    const lastPay = localStorage.getItem(STORAGE_KEYS.lastPayment);
    if (!lastPay) return null;
    try {
        return JSON.parse(lastPay);
    } catch {
        return null;
    }
}

export const getBalance = (userId: string): number => {
    const balance = localStorage.getItem(STORAGE_KEYS.balance(userId));
    return balance ? parseFloat(balance) : 0;
}

export const setBalance = (userId: string, balance: number) => {
    localStorage.setItem(STORAGE_KEYS.balance(userId), balance.toString());
}

export const addToBalance = (userId: string, amount: number) => {
    const currentBalance = getBalance(userId);
    const newBalance = currentBalance + amount;
    setBalance(userId, newBalance);

    return newBalance;
}