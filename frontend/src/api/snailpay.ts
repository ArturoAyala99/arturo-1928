import { apiRequest, ApiError } from "./client";
import type { SnailPayRequest, SnailPayResponse } from "../types/snailpay";

// api para realizar pagos con SnailPay
export const Payment = async (request: SnailPayRequest, simulateSystemError = false): Promise<SnailPayResponse> => {
    try {
        return await apiRequest<SnailPayResponse>("/api/snailpay/payment",{
            method: "POST",
            body: JSON.stringify(request),
            ...(simulateSystemError && {
                headers: { "X-SnailPay-Simulate": "system_error" },
            }),
        });
    } catch (error) {
        if (error instanceof ApiError && error.status === 500 && error.body) {
            return error.body as SnailPayResponse;
        }

        throw error;
    }
}