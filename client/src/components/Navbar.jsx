import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="bg-zinc-700 my-3 flex  justify-between py-5 px-10 rounded-lg">
            {isAuthenticated ? (
                 <Link to="/tasks"><h1 className="text-2xl font-bold">Bienvenido, {user.username}</h1></Link>
            ) : (
                <Link to="/"><h1 className="text-2xl font-bold">Admnistrador de tareas</h1></Link>
            )}
            <ul className="flex gap-x-4">
                {isAuthenticated ? (
                    <>
                        <li><Link className="bg-indigo-500 px-4 py-2" to="/add-task">Añadir Tarea</Link></li>
                        <li><Link className="bg-rose-500 px-4 py-2" to="/" onClick={() => { logout(); }}>Cerrar Sesión</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link className="bg-green-500 px-4 py-2" to="/login">Iniciar Sesión</Link></li>
                        <li><Link className="bg-sky-500 px-4 py-2" to="/register">Registro</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
