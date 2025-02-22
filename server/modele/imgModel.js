import mongoose from "mongoose";

const imgModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  img: {
    type: String, // Store image URLs
    required: true,
  },
});

const img = mongoose.model("Content", imgModel);
export default img;
