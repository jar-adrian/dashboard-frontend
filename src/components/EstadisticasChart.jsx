import {
    PieChart, Pie, Cell,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    LineChart, Line, ResponsiveContainer
} from 'recharts';

const COLORS = ['#00FF00', '#FFD700', '#FF0000'];

const EstadisticasChart = ({ data, tipo }) => {
    if (!data || data.length === 0) {
        return <p>No hay datos para mostrar</p>;
    }

    let chartComponent = null;

    if (tipo === "torta") {
        chartComponent = (
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        );
    } else if (tipo === "barras") {
        chartComponent = (
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Cantidad">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        );
    } else if (tipo === "lineas") {
        chartComponent = (
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="value"
                    name="Cantidad"
                    stroke="#8884d8"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    isAnimationActive={false}
                />
            </LineChart>
        );
    }

    return (
        <div style={{ width: "100%", height: 300 }}>
            {chartComponent ? (
                <ResponsiveContainer>
                    {chartComponent}
                </ResponsiveContainer>
            ) : (
                <p>Tipo de gráfico inválido</p>
            )}
        </div>
    );
};

export default EstadisticasChart;
