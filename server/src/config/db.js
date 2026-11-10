import mongoose from "mongoose";
export async function connectDB(uri) {
  if (!uri) {
    console.warn("MONGODB_URI is empty: using temporary in-memory demo data. Data resets when server restarts.");
    return false;
  }
  await mongoose.connect(uri);
  console.log("MongoDB connected");
  return true;
}
