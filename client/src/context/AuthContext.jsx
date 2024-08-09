import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';

/*
    createContext: Crea un contexto para almacenar datos relacionados con la autenticación.
    AuthContext: El contexto creado que será usado para proveer datos y funciones de autenticación a otros componentes.
*/
export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}


/*
    Este componente provee el contexto de la autenticaciona a todos sus componentes hijos.

    signup: le indicamos que recibira unos datos del usuario (userData), 
    llamamos a la funcion registerRequest con los datos del usuario y almacena la respuesta en res.
    Por ultimo actualizamos los datos del usuario (ya que estaban en null), con los nuevos.
*/
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (userData) => {
        try {
            const res = await registerRequest(userData);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
        }

    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
            //console.log(res.data);
        } catch (error) {
            //console.error(error);
            setErrors(error.response.data);
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    /* Este efecto es para que los errores se muestren unicamente durante el tiempo*/
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => { setErrors([]) }, 5000);
            return () => clearTimeout(timer)
        }
    }, [errors]);

    /* Comprobaremos que el usuario tiene el token para poder navegar correctamente*/
    useEffect(() => {
        //Creamos la funcion asincorna para checkear el login
        async function checkLogin() {
            //Con la dependendencia de js-cookie, obtiene la cookie si esque la tiene y la guarda en una constante
            const cookies = Cookies.get();

            //Si no tiene esa cookie, le indicamos que no esta autenticado y retornamos el usuario vacio
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                //Si tiene la cookie, guardara el resultado de la funcion verify del backend en una respuesta.
                const res = await verifyTokenRequest(cookies.token);

                //Si no recibe los datos le indicamos que no esta autorizado y el loading en false
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                } else {
                    //Si esta autorizado, le inidicamos que si esta autorizado, le pasamos los datos del usuario y el loading en false
                    setIsAuthenticated(true);
                    setUser(res.data);
                    setLoading(false);
                }
            } catch (error) {
                //Si se ha producido cualquier tipo de error, no estara autorizado
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }

        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ signup, signin, logout, loading, user, isAuthenticated, errors }}>
            {children}
        </AuthContext.Provider>
    );
}
