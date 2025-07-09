// src/pages/EstadisticasDashboard.jsx
import React, { useEffect, useState } from "react";
import EstadisticasChart from "../components/EstadisticasChart";

const EstadisticasDashboard = () => {
    const [estadisticas, setEstadisticas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/estadisticas/estado");
                if (!response.ok) throw new Error("Error al obtener estadísticas");

                const data = await response.json();

                const datosTransformados = [
                    { name: "Aprobados", value: data.aprobados },
                    { name: "Desaprobados", value: data.desaprobados },
                    { name: "Desertores", value: data.desertores }
                ];

                setEstadisticas(datosTransformados);
            } catch (err) {
                console.error("Error al cargar estadísticas:", err);
                setError("No se pudieron cargar los datos.");
            } finally {
                setCargando(false);
            }
        };

        obtenerDatos();
    }, []);

    return (
        <div>
            <h2>Estadísticas Generales</h2>
            {cargando && <p>Cargando datos...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!cargando && !error && <EstadisticasChart data={estadisticas} />}
        </div>
    );
};

export default EstadisticasDashboard;