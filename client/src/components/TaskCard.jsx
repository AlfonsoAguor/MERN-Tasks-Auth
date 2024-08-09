import { useTask } from "../context/TaskContext";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function TaskCard({ task }) {

    const { deleteTask } = useTask();

    return (
        <article className='flex flex-col bg-zinc-800 max-w-md p-5 rounded-md m-2 basis-[23%]'>
            <h2 className='flex justify-center text-xl pb-4 px-4'>{task.title}</h2>
            <div className='border-decoration-article border border-solid border-rose-400 mb-4'></div>
            <p className='flex justify-center m-4 text-gray-300'>{task.description}</p>
            <p className='flex justify-center text-gray-400'>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
            <div className="flex justify-evenly mt-4"> 
                <Link className="text-sky-500 px-2 py-1" to={`/tasks/${task._id}`}>Editar</Link>
                <button className="text-rose-500 px-2 py-1" onClick={() => { deleteTask(task._id) }}>Eliminar</button>
            </div>
        </article>
    )
}

export default TaskCard;