import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRoutes from './routes/user.routes.js';
import videosRoutes from './routes/videos.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//rotas
app.use('users', usersRoutes);
app.use('videos', videosRoutes);

// Conexão com o banco de dados e inicialização do servidor
const { HOST_USERNAME, HOST_PASSWORD, HOST_CLUSTER, HOST_DATABASE } = process.env;
const URI = `mongodb+srv://${HOST_USERNAME}:${HOST_PASSWORD}@${HOST_CLUSTER}/${HOST_DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(URI)
  .then(() => {
    console.log('Connect to the MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Connect error:', err);
  });