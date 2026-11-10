import mongoose from "mongoose";
const activitySchema = new mongoose.Schema({
  actor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  action: { type: String, required: true },
  message: { type: String, required: true }
}, { timestamps: true });
export default mongoose.model("Activity", activitySchema);
