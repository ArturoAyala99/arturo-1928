const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export class ApiError extends Error {
    status: number;
    body: unknown;

    constructor(status: number, body: unknown, message: string) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.body = body;
    }
}

export const apiRequest = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
    const url = `${API_URL}${path}`;

    let response: Response;
    try {
        response = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            }
        });
    } catch (error) {
        throw new ApiError(0, null, "No se pudo conectar con el servidor");
    }

    let data: T;
    try {
        data = await response.json();
    } catch(error) {
        throw new ApiError(response.status, null, `Respuesta inválida del servidor: ${error}`);
    }

    if (!response.ok) throw new ApiError(response.status, data, "Error del servidor");

    return data;
}