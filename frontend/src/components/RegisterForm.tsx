import { useState } from "react";
import type { FormEvent } from "react";
import * as validators from "../utils/validators";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export const RegisterForm = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // resetear valor de error en cada submit
        setError("");

        // validar campos
        if (!validators.isNotEmpty(name)) return setError("El nombre no puede estar vacío");
        if (!validators.isNotEmpty(email)) return setError("El correo electrónico no puede estar vacío");
        if (!validators.isValidEmail(email)) return setError("Correo electrónico no válido");
        if (!validators.isValidPassword(password)) return setError("La contraseña debe tener al menos 8 caracteres");
        if (!validators.passwordMatch(password, confirm)) return setError("Las contraseñas no coinciden");

        try {
            // bloquear el formulario mientras se está enviando y cambiar texto del botón
            setIsSubmitting(true);

            await register(name, email, password);

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
                    Nombre
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                />
            </div>

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

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar contraseña
                </label>
                <input
                    id="confirm"
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
            </button>

            {error && (
                <p className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded">
                    {error}
                </p>
            )}
        </form>
    );
}