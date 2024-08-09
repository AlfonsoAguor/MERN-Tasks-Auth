import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginPage() {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { signin, errors: LoginErrors, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        signin(data);
    });

    /*Este efecto se ejecutara cuando cambien el valor de isAutenticated*/
    useEffect(() => {
        if (isAuthenticated) navigate("/tasks");
    }, [isAuthenticated]);

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                <h1 className='flex justify-center mb-2 font-bold text-2xl tracking-wider'>Inicia sesión</h1>

                {
                    LoginErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white' key={i}>{error}</div>
                    ))
                }

                <form onSubmit={onSubmit}>

                    <input type="email" {...register("email", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md'
                        placeholder='Correo'
                    />
                    {errors.email && (<span className='text-red-500 w-full'>Se necesita un correo</span>)}

                    <input type="password" {...register("password", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md'
                        placeholder='Contraseña'
                    />
                    {errors.password && (<span className='block text-red-500 w-full'>Se necesita la contraseña</span>)}

                    <button type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded tracking-wider"
                    >Continuar</button>
                </form>
                <div className='flex mt-3 justify-between'>
                    <span className='flex items-center'>¿No tienes una cuenta?</span>
                    <Link to="/register" className="flex text-blue-500 py-2 px-3  rounded">Registrate</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;