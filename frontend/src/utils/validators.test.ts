import { describe, it, expect } from "vitest";
import { isValidEmail, isValidPassword, passwordMatch } from "./validators";

describe("isValidEmail", () => {
    it("acepta emails válidos", () => {
        const result = isValidEmail("test@example.com");
        expect(result).toBe(true);
    });

    it("rechaza sin @", () => {
        const result = isValidEmail("testexample.com");
        expect(result).toBe(false);
    });

    it("rechaza sin dominio", () => {
        const result = isValidEmail("test@");
        expect(result).toBe(false);
    });

    it("ignora espacios alrededor", () => {
        const result = isValidEmail("  test@example.com  ");
        expect(result).toBe(true);
    });
});

describe("isValidPassword", () => {
    it("acepta 8+ caracteres", () => {
        const result = isValidPassword("password123");
        expect(result).toBe(true);
    });

    it("rechaza menos de 8", () => {
        const result = isValidPassword("short");
        expect(result).toBe(false);
    });
});

describe("passwordMatch", () => {
    it("acepta iguales", () => {
        const result = passwordMatch("password123", "password123");
        expect(result).toBe(true);
    });
    
    it("rechaza distintas", () => {
        const result = passwordMatch("password123", "differentPassword");
        expect(result).toBe(false);
    });
});