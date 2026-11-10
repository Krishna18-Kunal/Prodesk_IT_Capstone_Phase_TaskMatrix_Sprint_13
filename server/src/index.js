import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { memory, seedMemory } from "./utils/memoryStore.js";
import { createUser, findUserByEmail } from "./utils/repository.js";
import bcrypt from "bcryptjs";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import taskRoutes from "./routes/tasks.js";
import dashboardRoutes from "./routes/dashboard.js";
import activityRoutes from "./routes/activities.js";

const app=express();
app.use(cors({origin:process.env.CLIENT_ORIGIN||"http://localhost:5173"}));
app.use(express.json({limit:"1mb"}));
app.get("/api/health",(req,res)=>res.json({status:"ok",database:mongoose.connection.readyState===1?"connected":"demo-memory"}));
app.use("/api/auth",authRoutes);
app.use("/api/projects",projectRoutes);
app.use("/api/tasks",taskRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/activities",activityRoutes);
app.use((req,res)=>res.status(404).json({message:"API route not found."}));
app.use((err,req,res,next)=>{console.error(err);if(err.name==="ValidationError")return res.status(400).json({message:err.message});if(err.name==="CastError")return res.status(400).json({message:"Invalid resource ID."});res.status(500).json({message:"Unexpected server error."});});

async function start(){
 try{
  const connected=await connectDB(process.env.MONGODB_URI);
  if(!connected){
   seedMemory();
   const demo=memory.users.find(u=>u.email==="demo@taskmatrix.local");
   demo.passwordHash=await bcrypt.hash("TaskMatrix123!",12);
  }else{
   let demo=await findUserByEmail("demo@taskmatrix.local");
   if(!demo){const passwordHash=await bcrypt.hash("TaskMatrix123!",12);demo=await createUser({name:"Demo User",email:"demo@taskmatrix.local",passwordHash});}
  }
  const port=process.env.PORT||5000;
  app.listen(port,()=>console.log(`TaskMatrix API running at http://localhost:${port}`));
 }catch(e){console.error("Startup failed:",e.message);process.exit(1);}
}
start();
