import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
    const { session, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600">Cargando...</p>
            </div>
        );
    }

    // si no hay sesión, redirigir al login
    if (!session) {
        return <Navigate to="/login"/>;
    }

    // si hay sesión, renderizar las rutas protegidas
    return <Outlet />; 
}