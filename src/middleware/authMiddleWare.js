import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
    try {

        //Get the token 
        const token = req.headers['authorization'].split(' ')[1]

        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized Access' })
            } else {
                //? Si el token es válido, añade el ID del usuario extraído del token a req.body.
                req.body.id = decode.id;
                next()
            }
        })

    } catch (error) {
        console.error('Error in valid token', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}