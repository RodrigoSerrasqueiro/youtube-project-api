import { Router } from "express"; 
import VideosRepository from "../modules/videos/repositories/videosRepository.js";
import { signIn } from "../middleware/sign-in.js";

const videosRoutes =  Router();
const videosRepository = new VideosRepository();

videosRoutes.post('/create-video', signIn, (req, res) => {
  videosRepository.create(req, res)
})

videosRoutes.get('/get-videos', signIn, (req, res) => {
  videosRepository.getVideos(req, res)
})

export default videosRoutes;