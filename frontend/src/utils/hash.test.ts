import { describe, it, expect } from "vitest";
import { hashPassword } from "./hash";

describe("hashPassword", () => {
    it("devuelve string de 64 caracteres hex", async () => {
        const result = await hashPassword("password123");

        expect(result).toBeTypeOf("string");
        expect(result).toHaveLength(64);
    });

    it("mismo input mismo output", async () => {
        const input = "password123";
        const result1 = await hashPassword(input);
        const result2 = await hashPassword(input);

        expect(result1).toBe(result2);
    });

    it("distinto input → distinto output", async () => {
        const result1 = await hashPassword("password123");
        const result2 = await hashPassword("differentPassword");

        expect(result1).not.toBe(result2);
    });
});