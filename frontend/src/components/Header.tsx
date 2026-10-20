import { useAuth } from "../context/AuthContext";

export const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white border-b border-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                <span className="font-bold text-gray-800">Snail Racing</span>

                <div className="flex items-center gap-3 min-w-0">
                    <span className="text-sm text-gray-700 truncate min-w-0">
                        <b>{user?.fullName}</b>
                    </span>
                    <button onClick={logout} className="shrink-0 ml-auto px-3 py-1.5 text-sm border border-red-300 rounded hover:bg-red-400 text-black cursor-pointer">
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </header>
    );
}