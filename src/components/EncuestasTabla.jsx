// src/components/EncuestasTabla.jsx
import React from "react";

const EncuestasTabla = ({ encuestas }) => {
    return (
        <div>
            <h3>Detalle de Encuestas</h3>
            <table>
                <thead>
                <tr>
                    <th>Estado</th>
                    <th>Motivo</th>
                    <th>Materia</th>
                    <th>Claridad</th>
                    <th>Comentario</th>
                </tr>
                </thead>
                <tbody>
                {encuestas.map((encuesta, index) => (
                    <tr key={index}>
                        <td>{encuesta.estado}</td>
                        <td>{encuesta.motivo}</td>
                        <td>{encuesta.materia}</td>
                        <td>{encuesta.claridad}</td>
                        <td>{encuesta.comentarios}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EncuestasTabla;