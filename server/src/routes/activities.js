import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { listActivities } from "../utils/repository.js";
const router=Router();router.use(requireAuth);
router.get("/",async(req,res,next)=>{try{res.json({activities:await listActivities(req.user.id,100)});}catch(e){next(e);}});
export default router;
