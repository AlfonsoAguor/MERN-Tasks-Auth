import {z} from 'zod';

export const registerSchema = z.object({
    //hacer mas tipo de comprobaciones, como que se introuce algo al usernem y no esta vacio
    username: z.string({
        required_error: 'Se necesina nombre de usuario'
    }),
    email: z.string({
        required_error: 'Se necesita un correo'
    }).email({
        message: 'Se necesita un correo'
    }),
    password: z.string({
        required_error: 'Se necesita una contraseña'
    }).min(6, {
        message: 'La contraseña debe de contener al menos 6 carateres'
    })
});

export const loginSchema = z.object({
    //en el login se podria comparar si la contraseña no es igual, etc..
    email: z.string({
        required_error: 'Se necesita un correo'
    }).email({
        message: 'El correo no es valido'
    }),
    password: z.string({
        required_error: 'Se necesita una contraseña'
    }).min(6, {
        message: 'La contraseña debe de contener al menos 6 carateres'
    })
});