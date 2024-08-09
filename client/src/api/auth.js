import instance from './axios.js';

/* Le indicariamos que cree una constante a la cual le pasara un usuario que tendra que enviar a /register con ese usuario que se esta dando*/
export const registerRequest = user => instance.post(`/register` , user);

export const loginRequest = user => instance.post(`/login` , user );

export const verifyTokenRequest = () => instance.get(`/verify`);