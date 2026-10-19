import {
    PieChart,
    Pie,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { BETS_SUMMARY } from "../constants/mockData";

const data = [
    { name: "Ganadas", value: BETS_SUMMARY.won, fill: "#22c55e" },
    { name: "Perdidas", value: BETS_SUMMARY.lost, fill: "#ef4444" },
];

export const BetsDonutChart = () => {
    const total = BETS_SUMMARY.won + BETS_SUMMARY.lost;
    const winRate = Math.round((BETS_SUMMARY.won / total) * 100);

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 text-center mb-3">Apuestas</h2>
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-green-600"><b>{BETS_SUMMARY.won} Ganadas</b></span>
                <span className="text-sm text-red-600"><b>{BETS_SUMMARY.lost} Perdidas</b></span>
                <span className="text-sm text-gray-700"><b>{total} totales</b></span>
            </div>

            <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={2}
                    />
                    <Tooltip />
                    <Legend
                        position="bottom"
                        height={30}
                        iconType="circle"
                    />
                </PieChart>
            </ResponsiveContainer>

            <p className="text-center text-sm text-gray-500 mt-1">
                <b>{winRate}% de acierto</b>
            </p>
        </div>
    );
}