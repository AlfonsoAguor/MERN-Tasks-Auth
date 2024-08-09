import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTask } from '../context/TaskContext';
import { Link, useParams } from 'react-router-dom';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc); //Para establecer la zona horaria e impedir problemas a la hora de introducir el dia

function TaskFormPage() {
    const { register, handleSubmit, reset, setValue } = useForm();
    const { createTask, getTask, updateTask } = useTask();
    const [successMessage, setSuccessMessage] = useState('');
    const params = useParams(); 

    useEffect(() => {
        async function loadTask(){
            if (params.id){
                const task = await getTask(params.id);
                setValue('title', task.title);
                setValue('description', task.description);
            }
        }
        loadTask();
    }, []);

    const onSubmit = async (data) => {
        if (params.id){
            await updateTask(params.id, {
                ...data,
                date: dayjs.utc(data.date).format()
        });
            setSuccessMessage('Tarea actualizada con éxito');
            reset(); // Resetea los valores del formulario
            setTimeout(() => setSuccessMessage(''), 3000); // Limpia el mensaje después de 3 segundos
        } else {
            await createTask({
                ...data,
                date: dayjs.utc(data.date).format()
        });
            setSuccessMessage('Tarea creada con éxito');
            reset(); // Resetea los valores del formulario
            setTimeout(() => setSuccessMessage(''), 3000); // Limpia el mensaje después de 3 segundos
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            {params.id ? (
                <>
                <h1 className='flex justify-center mb-2 font-bold text-2xl tracking-wider'>Editar Tarea</h1>
                </>
            ) : (
                <h1 className='flex justify-center mb-2 font-bold text-2xl tracking-wider'>Añadir Tarea</h1>
            )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="title">Titulo</label>
                    <input
                        type="text"
                        placeholder="Titulo"
                        {...register("title")}
                        autoFocus
                        className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md'
                    />

                    <label htmlFor="description">Descripción</label>
                    <textarea
                        rows="3"
                        placeholder="Descripción"
                        {...register("description")}
                        className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md'
                    ></textarea>

                    <label htmlFor="date">Fecha</label>
                    <input type="date" className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md" {...register("date")} />

                    <div className='flex items-center justify-around'>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 mt-2 rounded tracking-wider"
                        >
                            Guardar
                        </button>
                        <Link
                            to="/tasks"
                            className="bg-green-500 hover:bg-green-600 text-white ml-3 py-2 px-4 mt-2 rounded tracking-wider"
                        >
                            Ver tareas
                        </Link>
                    </div>
                </form>
                
                {successMessage && (
                    <div className="msgSuccess bg-zinc-700 px-20 py-2 text-green-400 rounded">{successMessage}</div>
                )}
            </div>
        </div>
    );
}

export default TaskFormPage;
