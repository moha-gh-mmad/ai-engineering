import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

const port = Number(process.env.PORT) || 3000;

app.listen(port, '127.0.0.1', () => {
   console.log(`Server is running on http://localhost:${port}`);
});
