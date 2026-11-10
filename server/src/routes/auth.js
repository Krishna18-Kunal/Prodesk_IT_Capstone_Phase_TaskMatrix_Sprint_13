import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, findUserById } from "../utils/repository.js";
import { requireAuth } from "../middleware/auth.js";
const router=Router();
const safe=u=>({id:u._id,name:u.name,email:u.email});
function tokenFor(u){return jwt.sign({id:String(u._id),name:u.name,email:u.email},process.env.JWT_SECRET||"development_only_secret_change_me",{expiresIn:"7d"});}
router.post("/register",async(req,res,next)=>{try{
 const {name,email,password}=req.body||{};
 if(!name?.trim()||!email||!password||password.length<8)return res.status(400).json({message:"Name, valid email and password (at least 8 characters) are required."});
 if(await findUserByEmail(email))return res.status(409).json({message:"An account with this email already exists."});
 const passwordHash=await bcrypt.hash(password,12);const user=await createUser({name:name.trim(),email:email.toLowerCase().trim(),passwordHash});
 res.status(201).json({token:tokenFor(user),user:safe(user)});
}catch(e){next(e);}});
router.post("/login",async(req,res,next)=>{try{
 const {email,password}=req.body||{};const user=await findUserByEmail(email||"");
 if(!user||!user.passwordHash||!(await bcrypt.compare(password||"",user.passwordHash)))return res.status(401).json({message:"Email or password is incorrect."});
 res.json({token:tokenFor(user),user:safe(user)});
}catch(e){next(e);}});
router.get("/me",requireAuth,async(req,res,next)=>{try{const user=await findUserById(req.user.id);if(!user)return res.status(404).json({message:"User not found."});res.json({user:safe(user)});}catch(e){next(e);}});
export default router;
