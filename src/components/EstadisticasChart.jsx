import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './EstadisticasChart.css'; // Importamos CSS para estilos específicos

// Colores personalizados
const COLORS = ['#00FF00', '#FFD700', '#FF0000'];

const EstadisticasChart = ({ data }) => {
    return (
        <div className="chart-container">
            <PieChart width={400} height={300}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    labelStyle={{ fontWeight: 'bold' }}
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default EstadisticasChart;