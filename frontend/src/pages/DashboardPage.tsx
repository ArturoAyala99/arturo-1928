import { useState } from "react";
import { Header } from "../components/Header";
import { BetsDonutChart } from "../components/BetsDonutChart";
import { SnailVictoriesChart } from "../components/SnailVictoriesChart";

export const DashboardPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <main className="min-h-screen bg-gray-100">
            <Header />
            {/* resto del dashboard */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                {/* Pasarela de pago */}
                <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                    Cargar saldo con SnailPay
                </button>

                {/* gráficas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BetsDonutChart />
                    <SnailVictoriesChart />
                </div>
                
            </div>
        </main>
    );
}