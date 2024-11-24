import { User } from "../models/userModel.js"
import { validaPartialUser, validateUser } from "../models/userValidation.js"


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

        if(!updateUser){
            return res.status(404).json({ message: 'User not found' })
        }

        // Responder con el usuario actualizado
        res.status(200).json({ msg: 'User updated successfully ', data: updateUser })


    } catch (error) {
        console.error('Update user info show an error ', error)
        res.status(500).json({ message: 'Internal Server Error ' })
    }
}