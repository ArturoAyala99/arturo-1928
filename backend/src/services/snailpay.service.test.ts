import { describe, it, expect } from "vitest";
import { Payment } from "./snailpay.service";
import type { SnailPayRequest } from "../types/snailpay.types";

const validRequest: SnailPayRequest = {
    card_number: "1234123412341234",
    expiry: "12/26",
    cvv: "543",
    full_name: "Arturo",
    amount: 100,
    payer_id: "user-123",
    payer_email: "arturo@test.com",
};

describe("Payment", () => {
    it("aprueba el pago con los datos correctos", () => {
        const result = Payment(validRequest);

        expect(result.status).toBe("approved");
        expect(result.status_detail).toBe("payment_approved");
        expect(result.authorization_code).not.toBeNull();
        expect(result.authorization_code).toMatch(/^AUTH-/);
    });

    it("rechaza con CVV incorrecto", () => {
        const result = Payment({ ...validRequest, cvv: "999" });

        expect(result.status).toBe("rejected");
        expect(result.status_detail).toBe("invalid_cvv");
        expect(result.authorization_code).toBeNull();
    });

    it("rechaza con fecha de vencimiento incorrecta", () => {
        const result = Payment({ ...validRequest, expiry: "01/30" });

        expect(result.status).toBe("rejected");
        expect(result.status_detail).toBe("invalid_expiry");
        expect(result.authorization_code).toBeNull();
    });

    it("rechaza con tarjeta distinta a la aprobada", () => {
        const result = Payment({ ...validRequest, card_number: "4000000000000002" });

        expect(result.status).toBe("rejected");
        expect(result.status_detail).toBe("card_declined");
        expect(result.authorization_code).toBeNull();
    });

     it("rechaza con monto cero o negativo", () => {
        const zero = Payment({ ...validRequest, amount: 0 });
        const negative = Payment({ ...validRequest, amount: -10 });

        expect(zero.status_detail).toBe("invalid_amount");
        expect(negative.status_detail).toBe("invalid_amount");
    });

    it("devuelve error de sistema cuando se fuerza", () => {
        const result = Payment(validRequest, { forceSystemError: true });

        expect(result.status).toBe("error");
        expect(result.status_detail).toBe("internal_server_error");
        expect(result.authorization_code).toBeNull();
    });
});