import React, { useState } from "react";
import { materias } from "../data/mockData";
import EncuestaForm from "../components/EncuestaForm";

const EncuestaPage = () => {
    const [materia, setMateria] = useState(materias[0]);

    const handleChange = (e) => {
        const seleccion = materias.find(m => m.id === parseInt(e.target.value));
        setMateria(seleccion);
    };

    return (
        <div>
            <h2>Encuesta Anónima del Alumno</h2>
            <label>Seleccioná la materia:</label>
            <select onChange={handleChange} value={materia.id}>
                {materias.map((m) => (
                    <option key={m.id} value={m.id}>
                        {m.nombre}
                    </option>
                ))}
            </select>

            <EncuestaForm materia={materia} />
        </div>
    );
};

export default EncuestaPage;