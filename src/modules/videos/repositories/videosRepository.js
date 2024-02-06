import Video from "../models/videos.model.js";
import { v4 as uuidv4 } from 'uuid';

class VideosRepository {

  async getVideos(req, res) {
    try {
      const { userId } = req.params;
      const videosCollection = await Video.findOne({ userId });

      if (!videosCollection) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      } 

      const videos = videosCollection.videos;

      res.status(200).json({ videos });
    } catch (error) {
      res.status(500).json({ message: "Erro ao obter videos do usuário." });
    }
  };

  async createVideo(req, res) {
    try {
      const { title, description, thumbnail, publishedAt } = req.body;
      const { userId } = req.params;

      const videosCollection = await Video.findOne({ userId });

      if (!videosCollection) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const video = {
        id: uuidv4(),
        title,
        description,
        publishedAt,
        thumbnail
      };

      videosCollection.videos.push(video);
      await videosCollection.save();
      res.status(200).json({ message: "Video adicionado com sucesso." });
    } catch (error) {
      res.status(500).json({ message: "Erro ao adicionar video." });
    }
  };

}

export default VideosRepository;