import { Link } from 'react-router';
import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar sesión</h1>
                <LoginForm /> 
                <p className="text-center text-sm text-gray-600 mt-4">
                    ¿No tienes cuenta? {" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Regístrate
                    </Link>
                </p>
            </div>
        </main>
    );
}