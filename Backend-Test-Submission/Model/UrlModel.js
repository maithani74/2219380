import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true },
  expiry: { type: Date, required: true },
  clickCount: { type: Number, default: 0 },
  clickHistory: [
    {
      timestamp: Date,
      referrer: String,
    },
  ],
});

const Url = mongoose.model("Url", urlSchema);
export default Url;
