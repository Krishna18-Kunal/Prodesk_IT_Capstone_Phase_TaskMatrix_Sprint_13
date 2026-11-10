import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { addActivity, createTask, deleteTask, findUserByEmail, getProject, getTask, listTasks, updateTask } from "../utils/repository.js";
const router=Router();router.use(requireAuth);
const statuses=["todo","inprogress","review","done"],priorities=["low","medium","high","urgent"];
router.get("/",async(req,res,next)=>{try{const tasks=await listTasks(req.user.id,{status:req.query.status,priority:req.query.priority,projectId:req.query.projectId,search:req.query.search});res.json({tasks});}catch(e){next(e);}});
router.post("/",async(req,res,next)=>{try{
 const {title,description="",status="todo",priority="medium",dueDate,project,assigneeEmail}=req.body||{};
 if(!title?.trim()||!project)return res.status(400).json({message:"Task title and project are required."});
 if(!statuses.includes(status)||!priorities.includes(priority))return res.status(400).json({message:"Invalid status or priority."});
 const p=await getProject(project,req.user.id);if(!p)return res.status(404).json({message:"Project not found."});
 const assignee=assigneeEmail?await findUserByEmail(assigneeEmail):null;
 if(assigneeEmail&&!assignee)return res.status(400).json({message:"No registered user found for that assignee email."});
 const task=await createTask({title:title.trim(),description,status,priority,dueDate:dueDate||null,project,assignee:assignee?assignee._id:req.user.id,createdBy:req.user.id});
 await addActivity({actor:req.user.id,project,action:"task_created",message:`created task "${title.trim()}"`});
 res.status(201).json({task});
}catch(e){next(e);}});
router.patch("/:id",async(req,res,next)=>{try{
 const current=await getTask(req.params.id,req.user.id);if(!current)return res.status(404).json({message:"Task not found."});
 const patch={};for(const k of ["title","description","status","priority","dueDate"])if(req.body[k]!==undefined)patch[k]=req.body[k];
 if(patch.status&&!statuses.includes(patch.status))return res.status(400).json({message:"Invalid task status."});
 if(patch.priority&&!priorities.includes(patch.priority))return res.status(400).json({message:"Invalid task priority."});
 if(req.body.project){const p=await getProject(req.body.project,req.user.id);if(!p)return res.status(404).json({message:"Project not found."});patch.project=req.body.project;}
 if(req.body.assigneeEmail!==undefined){const u=req.body.assigneeEmail?await findUserByEmail(req.body.assigneeEmail):null;if(req.body.assigneeEmail&&!u)return res.status(400).json({message:"Assignee account not found."});patch.assignee=u?u._id:req.user.id;}
 const task=await updateTask(req.params.id,req.user.id,patch);
 if(patch.status&&patch.status!==current.status)await addActivity({actor:req.user.id,project:current.project?._id||current.project,action:"task_status_changed",message:`moved "${current.title}" to ${patch.status}`});
 res.json({task});
}catch(e){next(e);}});
router.delete("/:id",async(req,res,next)=>{try{const task=await deleteTask(req.params.id,req.user.id);if(!task)return res.status(404).json({message:"Task not found."});await addActivity({actor:req.user.id,project:task.project?._id||task.project,action:"task_deleted",message:`deleted task "${task.title}"`});res.json({message:"Task deleted."});}catch(e){next(e);}});
export default router;
