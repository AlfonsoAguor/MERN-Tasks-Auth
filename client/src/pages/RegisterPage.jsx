import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

function RegisterPage() {
    const { register, handleSubmit, formState:{errors}, } = useForm();
    const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/tasks");
    }, [isAuthenticated, navigate]);
    

    const onSubmit = handleSubmit(async (values) => { signup(values); })

    return (
        <div className='flex items-center justify-center min-h-screen'>  
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                <h1 className='flex justify-center mb-2 font-bold text-2xl tracking-wider'>Registro</h1>

                {
                    RegisterErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white' key={i}>{error}</div>
                    ))
                }

                <form onSubmit={onSubmit}>

                    <input type="text" {...register("username", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md'
                        placeholder='Usuario'
                    />
                    {errors.username && (<span className='text-red-500 w-full'>Se necesita el usuario</span>)}

                    <input type="email" {...register("email", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md'
                        placeholder='Correo'
                    />
                    {errors.email && (<span className='text-red-500 w-full'>Se necesita un correo</span>)}  

                    <input type="password" {...register("password", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md'
                        placeholder='Contraseña'
                    />
                    {errors.password && (<p className='text-red-500 block w-full'>Se necesita la contraseña</p>)}

                    <button type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mt-2 rounded tracking-wider"
                    >Continuar</button>
                </form>
                <div className='flex mt-3 justify-between'>
                    <span className='flex items-center'>¿Ya tienes una cuenta?</span>
                    <Link to="/login" className="flex text-blue-500 py-2 px-4  rounded">Inicia sesión</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage