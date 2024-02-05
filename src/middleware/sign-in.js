import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const signIn = (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY)
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }
}

export { signIn };