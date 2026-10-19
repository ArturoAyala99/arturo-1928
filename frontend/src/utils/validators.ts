export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email.trim());
}

export function isValidPassword(password: string): boolean {
    return password.length >= 8;
}

export function passwordMatch(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
}

export function isNotEmpty(value: string): boolean {
    return value.trim().length > 0;
}