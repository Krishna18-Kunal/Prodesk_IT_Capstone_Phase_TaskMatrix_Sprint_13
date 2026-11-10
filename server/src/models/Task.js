import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 140 },
  description: { type: String, default: "", maxlength: 2000 },
  status: { type: String, enum: ["todo","inprogress","review","done"], default: "todo" },
  priority: { type: String, enum: ["low","medium","high","urgent"], default: "medium" },
  dueDate: { type: Date, default: null },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });
export default mongoose.model("Task", taskSchema);
