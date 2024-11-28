import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { corsMiddleWare } from './src/middleware/cors.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Importar rutas
import authRoute from './src/routes/authRouter.js';
import userRoute from './src/routes/userRouter.js';
import adminRoute from './src/routes/adminRouter.js';

dotenv.config();

const app = express();

// Desactivar x-powered-by
app.disable('x-powered-by');

// Configurar __dirname para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar vistas
app.set('views', path.join(__dirname, '/view'));
// Configura express para servir archivos estáticos desde la carpeta 'view/style'
app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');


// Conectar a la base de datos
mongoose
  .connect(process.env.MONGO_DATABASE_URL)
  .then(() => console.log('Database is running'))
  .catch((err) => console.log('Database connection error', err));




// Middleware
app.use(express.json());
app.use(morgan('dev'));


// Ruta principal para frontend
app.get('/', (req, res) => {
  res.render('pages/index', { title: 'Home Page' });
});

// Rutas de la API
app.use('/auth', authRoute); // Rutas de autenticación
app.use('/users', userRoute); // Rutas relacionadas con usuarios
app.use('/admin', adminRoute); // Rutas protegidas para administradores

// Manejo de 404
app.use((req, res) => {
  res.status(404).render('pages/404', { title: '404 - Page Not Found' });
});

// Iniciar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
