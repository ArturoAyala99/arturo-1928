import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import { SNAILS, SNAIL_VICTORIES } from "../constants/mockData";

const data = SNAIL_VICTORIES.map((v) => {
    const snail = SNAILS.find((s) => s.id === v.snailId);
    return { name: snail?.name ?? "?", wins: v.wins };
});

export const SnailVictoriesChart = () => {
    const totalRaces = SNAIL_VICTORIES.reduce((sum, v) => sum + v.wins, 0);

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 text-center mb-3">Victorias por caracol</h2>

            <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-700">
                    <b>{totalRaces} Carreras hoy</b>
                </span>
                <span className="text-sm text-gray-700">
                    <b>{SNAILS.length} Caracoles</b>
                </span>
            </div>

            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11, fill: "#000000" }}
                        axisLine={{ stroke: "#e5e7eb" }}
                        tickLine={false}
                    />
                    <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 11, fill: "#000000" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        cursor={{ fill: "#f3f4f6" }}
                        contentStyle={{ fontSize: 12, borderRadius: 6 }}
                    />
                    <Bar dataKey="wins" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}