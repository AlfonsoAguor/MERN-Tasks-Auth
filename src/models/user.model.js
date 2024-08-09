import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true /*Elimina los espacios*/
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true /*Hace que el correo sea unico*/
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

export default mongoose.model('User', userSchema);