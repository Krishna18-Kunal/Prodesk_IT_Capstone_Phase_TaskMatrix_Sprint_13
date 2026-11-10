import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { listActivities, listProjects, listTasks } from "../utils/repository.js";
const router=Router();router.use(requireAuth);
router.get("/",async(req,res,next)=>{try{
 const [tasks,projects,activities]=await Promise.all([listTasks(req.user.id),listProjects(req.user.id),listActivities(req.user.id,6)]);
 const now=new Date();const overdue=tasks.filter(t=>t.dueDate&&new Date(t.dueDate)<now&&t.status!=="done").length;
 const progress=projects.map(p=>{const ts=tasks.filter(t=>String(t.project?._id||t.project)===String(p._id));return {...p.toObject?.()||p,taskCount:ts.length,progress:ts.length?Math.round(ts.filter(t=>t.status==="done").length/ts.length*100):0};});
 res.json({metrics:{total:tasks.length,inProgress:tasks.filter(t=>t.status==="inprogress").length,completed:tasks.filter(t=>t.status==="done").length,overdue},projects:progress,activities});
}catch(e){next(e);}});
export default router;
