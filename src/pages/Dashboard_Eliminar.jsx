import React, { useState } from "react";
import EstadisticasChart from "../components/EstadisticasChart";
import { materias } from "../data/mockData_Elmiminar";

const Dashboard_Eliminar = () => {
    const [materiaSeleccionada, setMateriaSeleccionada] = useState(materias[0]);

    const handleChange = (e) => {
        const seleccion = materias.find(m => m.id === parseInt(e.target.value));
        setMateriaSeleccionada(seleccion);
    };

    return (
        <div>
            <h2>Estadísticas de la Materia</h2>

            <select onChange={handleChange} value={materiaSeleccionada.id}>
                {materias.map((m) => (
                    <option key={m.id} value={m.id}>
                        {m.nombre}
                    </option>
                ))}
            </select>

            <EstadisticasChart data={materiaSeleccionada.estadisticas} />
        </div>
    );
};

export default Dashboard_Eliminar;