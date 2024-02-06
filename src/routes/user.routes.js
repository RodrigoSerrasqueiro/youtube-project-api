import { Router } from "express"; 
import { signIn } from "../middleware/sign-in.js"; 
import UsersRepository from "../modules/users/repositories/usersRepository.js";

const usersRoutes =  Router();
const usersRepository = new UsersRepository();

usersRoutes.post('/sign-up', (req, res) => {
  usersRepository.createUser(req, res);
})

usersRoutes.post('/sign-in', (req, res) => {
  usersRepository.signIn(req, res);
})

usersRoutes.get('/get-user', signIn, (req, res) => {
  usersRepository.getUser(req, res);
})

export default usersRoutes;