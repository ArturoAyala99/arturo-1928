import { Link } from "react-router";
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-slate-400 px-4">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Crear cuenta</h1>
                <RegisterForm />
                <p className="text-center text-sm text-gray-600 mt-4">
                    ¿Ya tienes cuenta? {" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </main>
    );
}