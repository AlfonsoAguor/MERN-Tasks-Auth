import { createContext, useContext, useState } from 'react';
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from '../api/tasks';


const TaskContext = createContext();

// Hook personalizado para usar el contexto de tareas
export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTask must be used within a TaskProvider");
    }
    return context;
}


export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    const getTasks = async() => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);
        } catch (error) {
            console.error(error);
        }
        
    };

    const createTask = async(task) => {
        const res = await createTaskRequest(task);
        //console.log(res);
    };

    const deleteTask = async (id) => {
        try {   
            const res = await deleteTaskRequest(id);
            /* Si el codigo es 204, se hara este arreglo para que recargue de nuevo la pagina sin la tarea eliminada*/
            if(res.status == 204) setTasks(tasks.filter(task => task._id != id));
        } catch (error) {
            console.log(error);
        }
        
    };

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }

    };

    const updateTask = async (id, task) => {
        try {
            await updateTaskRequest(id, task);
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <TaskContext.Provider value={{ tasks, createTask, getTasks, getTask, deleteTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
}
