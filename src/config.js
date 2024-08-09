//Crea la contraseña necesaria para generar el token
//Esto se lo pasamos a libs/jwt.js
import dotenv from 'dotenv';
dotenv.config();

export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 4000;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
