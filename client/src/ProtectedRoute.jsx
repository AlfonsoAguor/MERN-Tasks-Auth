import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function ProtectedRoute(){
    const { loading, isAuthenticated } = useAuth();
    //console.log(loading, isAuthenticated);

    //Si loading esta en true, significa que no hemos hecho la verificacion del token, ya que el valor se cambian en useEffect del authContext
    if(loading) return <h1>Loading...</h1>

    //Si loading es false y la autenticacion tambien, no permitiremos la navegacion en las rutas protegidas
    if (!loading && !isAuthenticated) return <Navigate to="/login" replace/>

    //Si tidas estas fallan, quiere decir que loading esta en false y la autenticacion en true, por lo que permitiremos la navegacion
    return (
        <Outlet/>
    ); 
}

export default ProtectedRoute