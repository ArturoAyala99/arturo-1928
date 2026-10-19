import { useState } from "react";
import type { FormEvent } from "react";
import * as validators from "../utils/validators";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // resetear valor de error en cada submit
        setError("");

        // validar campos
        if (!validators.isNotEmpty(email)) return setError("El correo electrónico no puede estar vacío");
        if (!validators.isValidEmail(email)) return setError("Correo electrónico no válido");
        if (!validators.isNotEmpty(password)) return setError("La contraseña no puede estar vacía");
        
        try {
            // bloquear el formulario mientras se está enviando y cambiar texto del botón
            setIsSubmitting(true);

            await login(email, password);

            // si todo sale bien, redirigir a dashboard (página principal)
            navigate("/dashboard");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error inesperado");
        } finally {
            setIsSubmitting(false);
        }
        
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? "Entrando..." : "Iniciar sesión"}
            </button>
            

            {error && (
                <p className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded">
                    {error}
                </p>
            )}
        </form>
    );
}