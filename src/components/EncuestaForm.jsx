import React from 'react';
import { useForm } from 'react-hook-form';

const EncuestaForm = ({ materia }) => {
    const { register, handleSubmit, reset, watch } = useForm();
    const estado = watch("estado");

    const onSubmit = async (data) => {
        const respuesta = {
            materia: materia?.nombre || "Sin materia",
            ...data,
        };

        try {
            const response = await fetch("http://localhost:8080/api/encuestas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(respuesta)
            });

            if (response.ok) {
                alert(`¡Gracias por responder sobre ${respuesta.materia}!`);
                reset();
            } else {
                alert("Ocurrió un error al enviar la encuesta.");
            }
        } catch (error) {
            console.error("Error al enviar la encuesta:", error);
            alert("No se pudo conectar con el servidor.");
        }
    };

    return (
        <form className="encuesta-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Encuesta sobre {materia?.nombre}</h2>

            <label>¿Cuál es tu estado actual en la materia?</label>
            <div className="radios">
                <label><input type="radio" value="APROBADO" {...register("estado")} required /> Aprobado</label>
                <label><input type="radio" value="DESAPROBADO" {...register("estado")} /> Desaprobado</label>
                <label><input type="radio" value="DESERTOR" {...register("estado")} /> Desertor</label>
            </div>

            {estado && (
                <>
                    {estado !== "APROBADO" ? (
                        <>
                            <label>Motivo principal de tu situación:</label>
                            <select {...register("motivo")} required>
                                <option value="">Seleccionar</option>
                                <option value="contenido">No entendí el contenido</option>
                                <option value="profesor">Problema con el profesor</option>
                                <option value="personal">Problemas personales</option>
                                <option value="otros">Otros</option>
                            </select>

                            <label>¿Fue clara la metodología de enseñanza?</label>
                            <div className="radios">
                                <label><input type="radio" value="si" {...register("claridad")} required /> Sí</label>
                                <label><input type="radio" value="no" {...register("claridad")} /> No</label>
                            </div>
                        </>
                    ) : (
                        <p>¡Gracias por tu esfuerzo y dedicación!</p>
                    )}

                    <label>Comentarios adicionales (opcional):</label>
                    <textarea {...register("comentarios")} rows="4" />
                </>
            )}

            <button type="submit">Enviar</button>
        </form>
    );
};

export default EncuestaForm;