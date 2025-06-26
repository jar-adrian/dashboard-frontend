import React from 'react';
import { useForm } from 'react-hook-form';

const EncuestaForm = ({ materia }) => {
    const { register, handleSubmit, reset, watch } = useForm();
    const estado = watch("estado"); // observar el campo estado

    const onSubmit = (data) => {
        const respuesta = {
            materia: materia?.nombre || "Sin materia",
            ...data,
        };
        console.log("Encuesta enviada:", respuesta);
        alert(`¡Gracias por responder sobre ${respuesta.materia}!`);
        reset();
    };

    return (
        <form className="encuesta-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Encuesta sobre {materia?.nombre}</h2>

            <label>¿Cuál es tu estado actual en la materia?</label>
            <div className="radios">
                <label><input type="radio" value="aprobado" {...register("estado")} required /> Aprobado</label>
                <label><input type="radio" value="desaprobado" {...register("estado")} /> Desaprobado</label>
                <label><input type="radio" value="desertor" {...register("estado")} /> Desertor</label>
            </div>

            {estado && (
                <>
                    {estado !== "aprobado" ? (
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
