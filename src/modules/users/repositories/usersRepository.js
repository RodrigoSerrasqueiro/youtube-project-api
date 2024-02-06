import User from "../models/users.model.js";
import Video from "../../videos/models/videos.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

class UsersRepository {

  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword
      }
      const videosCollection = {
        userId: newUser.id,
        videos: []
      }

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(409).json({ message: "Já existe um usuário cadastrado com esse email." });
      }

      await User.create(newUser);
      await Video.create(videosCollection);
      res.status(200).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar novo usuário." });
    }

  };

  async signIn(req, res) {  
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Senha incorreta.' });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1w' });
      return res.status(200).json({ message: 'Usuário autenticado com sucesso.', token: token });

    } catch (error) {
      return res.status(500).json({ error: 'Não foi possível realizar o login do usuário.' });
    }
  };

  async getUser(req, res) {
    try {
      const userId = req.user.id
      const user = await User.findOne({id: userId});
      if (!user) {
        return res.status(404).json({message: 'Usuário não encontrado'});
      }

      const filteredUser = {
        id: user.id,
        name: user.name,
        email: user.email
      }
  
      res.status(200).json({ user: filteredUser });
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  };

}

export default UsersRepository;