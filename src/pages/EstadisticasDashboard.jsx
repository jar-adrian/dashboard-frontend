import React, { useEffect, useState } from "react";
import EstadisticasChart from "../components/EstadisticasChart";
import EncuestasTabla from "../components/EncuestasTabla";

const EstadisticasDashboard = () => {
    const [estadisticas, setEstadisticas] = useState([]);
    const [encuestas, setEncuestas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [tipoGrafico, setTipoGrafico] = useState("torta");
    const [filtroEstado, setFiltroEstado] = useState("todos");
    const [filtroMateria, setFiltroMateria] = useState("todas");

    // Obtener datos al montar el componente
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const [resEstadisticas, resEncuestas] = await Promise.all([
                    fetch("http://localhost:8080/api/estadisticas/estado"),
                    fetch("http://localhost:8080/api/encuestas")
                ]);

                if (!resEstadisticas.ok || !resEncuestas.ok)
                    throw new Error("Error al obtener datos");

                const dataEstadisticas = await resEstadisticas.json();
                const dataEncuestas = await resEncuestas.json();

                const datosTransformados = Object.entries(dataEstadisticas).map(([estado, cantidad]) => ({
                    name: estado,
                    value: cantidad
                }));

                setEstadisticas(datosTransformados);
                setEncuestas(dataEncuestas);
            } catch (err) {
                console.error("Error al cargar datos:", err);
                setError("No se pudieron cargar los datos.");
            } finally {
                setCargando(false);
            }
        };

        obtenerDatos();
    }, []);

    // Obtener las materias únicas desde los datos
    const materiasUnicas = [...new Set(encuestas.map(e => e.materia))];

    // Filtro aplicado a las encuestas
    const encuestasFiltradas = encuestas.filter(encuesta => {
        const coincideEstado =
            filtroEstado === "todos" || encuesta.estado === filtroEstado;
        const coincideMateria =
            filtroMateria === "todas" || encuesta.materia === filtroMateria;
        return coincideEstado && coincideMateria;
    });

    return (
        <div>
            <h2>Estadísticas Generales</h2>

            {/* Selector de tipo de gráfico */}
            <label htmlFor="tipo">Tipo de gráfico: </label>
            <select
                id="tipo"
                value={tipoGrafico}
                onChange={e => setTipoGrafico(e.target.value)}
            >
                <option value="torta">Gráfico de Torta</option>
                <option value="barras">Gráfico de Barras</option>
                <option value="lineas">Gráfico de Líneas</option>
            </select>

            {/* Filtros */}
            <div style={{ marginTop: "1rem" }}>
                <label htmlFor="estado">Filtrar por estado: </label>
                <select
                    id="estado"
                    value={filtroEstado}
                    onChange={e => setFiltroEstado(e.target.value)}
                >
                    <option value="todos">Todos</option>
                    <option value="APROBADO">Aprobado</option>
                    <option value="DESAPROBADO">Desaprobado</option>
                    <option value="DESERTOR">Desertor</option>
                </select>

                <label htmlFor="materia" style={{ marginLeft: "1rem" }}>
                    Filtrar por materia:{" "}
                </label>
                <select
                    id="materia"
                    value={filtroMateria}
                    onChange={e => setFiltroMateria(e.target.value)}
                >
                    <option value="todas">Todas</option>
                    {materiasUnicas.map((materia, index) => (
                        <option key={index} value={materia}>
                            {materia}
                        </option>
                    ))}
                </select>
            </div>

            {/* Indicadores */}
            {cargando && <p>Cargando datos...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Gráfico y tabla */}
            {!cargando && !error && (
                <>
                    <EstadisticasChart data={estadisticas} tipo={tipoGrafico} />

                    <p style={{ marginTop: "1rem" }}>
                        Mostrando {encuestasFiltradas.length} encuestas
                    </p>

                    <EncuestasTabla encuestas={encuestasFiltradas} />
                </>
            )}
        </div>
    );
};

export default EstadisticasDashboard;