import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { validateUser } from "../models/userValidation.js";

export const userRegisterController = async (req, res) => {
    try {
        const validation = validateUser(req.body)

        if (!validation.success) {
            return res.status(400).json({ error: JSON.parse(validation.error.message) })
        }

        const { email, password } = validation.data

        //? Verificar si el usuario existe
        const userExisting = await User.findOne({ email })
        if (userExisting) {
            return res.status(400).json({ error: 'Email is already registered' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            id: crypto.randomUUID(),
            ...validation.data,
            password: hashedPassword, 
            
        });
        console.log("Hashed password:", hashedPassword);


        return res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser.id, email: newUser.email},
        })

    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}