//Esto servira para hacer una validacion antes, para eso le pasaremos los esquemas de validacion creados en la carpeta schemas

import errorMap from "zod/locales/en.js";

export const validateSchema = (schema) => (req, res, next) => {
    try {
        //valida con el schema parse el req.body(username, email, password), si toda va bien continua
        schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json(
            /*Dentro de los 'error' de zod, se encuentra errors, que lo recorreremos con el map para que unicamente nos muestre los mensajes
            Para comprobar el contenido de error podemos hacerlo con el console.log(error.errors) fuera del return*/
            error.errors.map(error => error.message)
        );
    }
}