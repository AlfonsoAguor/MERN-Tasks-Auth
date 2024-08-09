import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";

//Para que la funcion sea un middleware, tiene que tener el next
//En este caso si se valida el token, hara lo siguiente que se le indique
//Lo exportaremos para utlizar en routes/auth.routes.js
export const authRequired = (req, res, next) => {
    
    const {token} = req.cookies;
    if(!token) return res.status(401).json({
        message: "Authorization denied"
    });

    //Va a verificar el contenido del token, con la contraseña creada inicialmente
    //Puede devolver un error o el decodificado
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(401).json({
            message: "Invalid token"
        });

        //Se guarda el id decodificado, en req, para poder recogerlo en profile
        req.user = decoded;

        next();
    });
};