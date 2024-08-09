import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    try {
        //Buscaria las tareas unicamente del usuario
        //con el populate, recogeria todos los datos del usuario recogidos del login de auth.controller.js
        const tasks = await Task.find({
            user: req.user.id
        }).populate('user');
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({ message: "Algo fue mal" });
    }
};

export const createTasks = async (req, res) => {
    try {
        const { title, description, date } = req.body;

        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id //Cuando hacemos el authRequired, en este guardamos el id del usuario
        });
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (error) {
        return res.status(500).json({ message: "Algo fue mal" });
    }
};

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({
            message: 'Task not found'
        });
        res.json(task);
    } catch (error) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }
};

export const updateTasks = async (req, res) => {
    try {
        //Se pone el new:true, ya que obtiene el dato viejo y no el nuevo

        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!task) return res.status(404).json({
            message: 'Task not found'
        });
        res.json(task);
    } catch (error) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }
};

export const deleteTasks = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({
            message: 'Task not found'
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }
};