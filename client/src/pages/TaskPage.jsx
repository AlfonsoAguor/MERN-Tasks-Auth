import { useEffect } from 'react';
import { useTask } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';

function TaskPage() {
    const { getTasks, tasks } = useTask();

    useEffect(() => {
        getTasks();
    }, []);

    if (tasks.lenght == 0) return (<h1>No hay tareas</h1>);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <h1 className='flex justify-center w-full font-bold text-4xl tracking-wider'>Tareas</h1>
            <div className='border-decoration-articles w-60 my-2'></div>
            <div className='flex flex-row flex-wrap justify-start mt-5'>
                {
                    tasks.map(task => (
                        <TaskCard task={task} key={task._id}></TaskCard>
                    ))
                }
            </div>
        </div>
    );

}

export default TaskPage