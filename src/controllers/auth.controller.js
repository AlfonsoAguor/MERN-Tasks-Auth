import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {createAccessToken} from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js'; 


//asyn se utiliza cuando va a haber perticiones a la base de datos
export const register = async (req, res) => {
    const {email, password, username} = req.body;

    try{

        const userFound = await User.findOne({email});
        if (userFound) return res.status(400).json(['El correo esta en uso']);

        //Hasheamos la contraseña para encriptarla
        const passwordHash = await bcrypt.hash(password, 10);

        //Creamos el nuevo usuarios con los valores introducidos
        const newUser = new User({
            username,
            email,
            password: passwordHash
        }); 

        const userSaved = await newUser.save(); //guarda el usuario
        const token = await createAccessToken({id: userSaved._id}); //Le pasamos id del usuario, esto lo utilizara en libs/jwt.js en forma de payload
        res.cookie('token', token); //Guarda el token en una cookie
        res.json({
            message: "User created successfully",
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            pass: userSaved.password
        });
    }
    catch (error){
        res.status(500).json({ message: error.mesage });
    }

};

export const login = async (req, res) => {
    const {email, password} = req.body;

    try{

        //Compara el correo introducido
        const userFound = await User.findOne({email});
        if (!userFound) return res.status(400).json(["No se encuentra el correo"]);

        //comparamos las contraseñas
        const isMatch = await bcrypt.compare(password, userFound.password );
        /*Normalmente no se da tantos mensajes porque es inconveniente*/
        if (!isMatch) return res.status(400).json(["Contraseña incorrecta"]);

        const token = await createAccessToken({id: userFound._id}); //Le pasamos id del usuario
       
       //Guarda el token en una cookie
        res.cookie('token', token); 

        res.json({
            message: "Login successfully",
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            pass: userFound.password
        });
    }
    catch (error){
        res.status(500).json({ message: error.mesagge });
    }

};

export const logout = (req, res) => {
    //Para hacer el logout, tan simple con indicarle el token vacio y cuando expirara (0)
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({
        message: "User not found"
    });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    });

    res.send('profile');
};

export const verifyToken = async (req, res) => {
    //Almacena el token en una constante
    const { token } = req.cookies;

    //Si no existe, devolvemos que no esta autorizado
    if (!token) {
        return res.status(401).json(["Unauthorized"]);
    }

    //Si existe, verificaremos el token , este sera una funcion asincorna y devolvera error o el id descodificado
    jwt.verify(token, TOKEN_SECRET, async (err, decode) => {

        //Si da error, no esta autorizado
        if (err) {
            return res.status(401).json(["Unauthorized"]);
        }

        //Si devuelve el id, busaremos el usuario por este id.
        //Si no lo encuentra, no autorizado.
        //SI lo encuentra, le pasamos el valor de este usuario por un json
        try {
            const userFound = await User.findById(decode.id);
            if (!userFound) {
                return res.status(401).json(["Unauthorized"]);
            }

            return res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email
            });
        } catch (error) {
            return res.status(500).json(["Server error"]);
        }
    });
};