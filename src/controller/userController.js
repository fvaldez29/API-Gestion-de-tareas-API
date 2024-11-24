import { User } from "../models/userModel.js"
import { validaPartialUser, validateUser } from "../models/userValidation.js"
import bcrypt from 'bcrypt'

// GET USER
export const showUserController = async (req, res) => {
    try {
        const user = await User.findById(req.body.id)

        if (!user) return res.status(404).json({ message: 'User not found' })

        // Hidden Password
        user.password = undefined

        res.status(200).send(user)

    } catch (error) {
        console.error('Internal error in show user ', error)
        res.status(500).json({ message: 'Error in show user info' })
    }
}



//? UPDATE USER INFO
export const updateUserController = async (req, res) => {
    try {

        // Validar los datos enviados
        const { id, ...updateData } = req.body

        const validation = validaPartialUser(updateData)

        if (!validation.success) {
            return res.status(500).json({ error: JSON.parse(validation.error.message) })
        }

        // Buscar y actualizar al usuario
        const updateUser = await User.findByIdAndUpdate(
            id,
            validation.data,
            { new: true, runValidators: true } //* Para devolver el usuario y aplicar validacion de moongose
        )

        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Responder con el usuario actualizado
        res.status(200).json({ msg: 'User updated successfully ', data: updateUser })


    } catch (error) {
        console.error('Update user info show an error ', error)
        res.status(500).json({ message: 'Internal Server Error ' })
    }
}

//? RESET PASSWORD 
export const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword } = req.body

        if (!email || !newPassword) {
            return res.status(404).json(
                { 
                    msg: 'Please check your email and password'
                 })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: 'Invalid credentials. Please check your input.' })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword

        await user.save()

        res.status(200).json({
            message: 'User password reset Successfully '
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: 'Internal error when reset password' })
    }
}