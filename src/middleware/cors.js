import cors from 'cors'

  // Accepted originis
  const ACCEPTED_ORIGINS = [
    'http://localhost:8000',
    'http://localhost:3000',
    'http://localhost:8080'

  ]


export const corsMiddleWare = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
    origin: (origin, callback) => {
    
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }
  
      if (!origin) {
        return callback(null, true)
      }
  
      return callback(new Error('Not allowed by CORS'))
    }
  })