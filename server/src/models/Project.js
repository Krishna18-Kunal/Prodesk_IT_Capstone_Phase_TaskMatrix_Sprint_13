import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 90 },
  description: { type: String, default: "", maxlength: 500 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });
export default mongoose.model("Project", projectSchema);
