import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  publishedAt: { type: Date, required: true },
  thumbnail: { type: String, required: true },
});

const Video = mongoose.model('videos', videoSchema);

export default Video;