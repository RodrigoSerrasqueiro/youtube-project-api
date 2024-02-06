import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  publishedAt: { type: Date, required: true },
  thumbnail: { type: String, required: true },
});

const videosCollectionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  videos: [videoSchema]
});

const Video = mongoose.model('videos', videosCollectionSchema);

export default Video;