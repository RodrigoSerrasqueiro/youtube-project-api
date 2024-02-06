import { Router } from "express"; 
import VideosRepository from "../modules/videos/repositories/videosRepository.js";
import { signIn } from "../middleware/sign-in.js";

const videosRoutes =  Router();
const videosRepository = new VideosRepository();

videosRoutes.post('/create-video/:userId', signIn, (req, res) => {
  videosRepository.createVideo(req, res);
})

videosRoutes.get('/get-videos/:userId', signIn, (req, res) => {
  videosRepository.getVideos(req, res);
})

export default videosRoutes;