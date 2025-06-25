import React from 'react';
import { useForm } from 'react-hook-form';

const EncuestaForm = ({ materia }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        const respuesta = {
            materia: materia.nombre,
            ...data,
        };
        console.log("Encuesta enviada:", respuesta);
        alert(`¡Gracias por responder sobre ${materia.nombre}!`);
        reset();
    };

    return (
        <form className="encuesta-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Encuesta sobre {materia.nombre}</h2>

            <label>Motivo principal:</label>
            <select {...register("motivo")} required>
                <option value="">Seleccionar</option>
                <option value="contenido">No entendí el contenido</option>
                <option value="profesor">Problema con el profesor</option>
                <option value="personal">Problemas personales</option>
                <option value="otros">Otros</option>
            </select>

            <label>¿Fue clara la metodología?</label>
            <div className="radios">
                <label><input type="radio" value="si" {...register("claridad")} required /> Sí</label>
                <label><input type="radio" value="no" {...register("claridad")} /> No</label>
            </div>

            <label>Comentarios (opcional):</label>
            <textarea {...register("comentarios")} rows="4" />

            <button type="submit">Enviar</button>
        </form>
    );
};

export default EncuestaForm;
