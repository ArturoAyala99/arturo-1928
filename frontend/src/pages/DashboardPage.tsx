import { useState } from "react";
import { Header } from "../components/Header";
import { BetsDonutChart } from "../components/BetsDonutChart";
import { SnailVictoriesChart } from "../components/SnailVictoriesChart";
import { SnailPayModal } from "../components/SnailPayModal";
import { useAuth } from "../context/AuthContext";
import { getBalance } from "../services/balanceService";
import { getLastPayment } from "../services/balanceService";

export const DashboardPage = () => {
    const { user } = useAuth();

    const [balance, setBalance] = useState(() => (user ? getBalance(user.id) : 0));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const lastPayment = getLastPayment();
    
    return (
        <main className="min-h-screen bg-gradient-to-b from-sky-50 to-slate-400">
            <Header />

            {/* resto del dashboard */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                {/* Btn de saldo + Saldo */}
                <div className="mb-4 bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                        Cargar saldo con SnailPay
                    </button>
                    <div>
                        <p className="text-xl text-gray-700"><b>Saldo disponible</b></p>
                        <p className="text-2xl font-bold text-gray-700">
                            ${balance.toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* último pago (localStorage) */}
                {lastPayment && (
                    <div className="mb-4 bg-white p-4 rounded-lg shadow">
                        <p className="text-xl text-gray-700"><b>Último pago</b></p>
                        <p className="text-sm text-gray-700">
                            <b>
                                ${lastPayment.amount.toFixed(2)} -{" "}
                                {new Date(lastPayment.date).toLocaleDateString("es-MX")} -{" "}
                                ****{lastPayment.card_number.slice(-4)}
                            </b>
                        </p>
                    </div>
                )}
                
                {/* gráficas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BetsDonutChart />
                    <SnailVictoriesChart />
                </div>
                
                {isModalOpen && <SnailPayModal onClose={()=> setIsModalOpen(false)} onSuccess={(newBalance) => setBalance(newBalance)} />}
            </div>
        </main>
    );
}