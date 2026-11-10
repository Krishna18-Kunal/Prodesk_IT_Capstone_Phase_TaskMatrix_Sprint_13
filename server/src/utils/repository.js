import mongoose from "mongoose";
import User from "../models/User.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import Activity from "../models/Activity.js";
import { memory, id } from "./memoryStore.js";

export const isDB = () => mongoose.connection.readyState === 1;
const plain = x => x?.toObject ? x.toObject() : x;
export async function findUserByEmail(email){ return isDB() ? User.findOne({email:email.toLowerCase()}) : memory.users.find(u=>u.email===email.toLowerCase()) || null; }
export async function findUserById(uid){ return isDB() ? User.findById(uid) : memory.users.find(u=>u._id===uid) || null; }
export async function createUser(data){ return isDB() ? User.create(data) : (memory.users.push({_id:id(),...data,createdAt:new Date()}),memory.users.at(-1)); }
export async function listProjects(uid){
 if(isDB()) return Project.find({owner:uid}).sort({createdAt:-1});
 return memory.projects.filter(p=>p.owner===uid).sort((a,b)=>b.createdAt-a.createdAt);
}
export async function getProject(pid,uid){return isDB()?Project.findOne({_id:pid,owner:uid}):memory.projects.find(p=>p._id===pid&&p.owner===uid)||null;}
export async function createProject(data){return isDB()?Project.create(data):(memory.projects.push({_id:id(),...data,createdAt:new Date()}),memory.projects.at(-1));}
export async function updateProject(pid,uid,patch){if(isDB())return Project.findOneAndUpdate({_id:pid,owner:uid},patch,{new:true,runValidators:true});const p=memory.projects.find(x=>x._id===pid&&x.owner===uid);if(p)Object.assign(p,patch);return p||null;}
export async function deleteProject(pid,uid){if(isDB()){const p=await Project.findOneAndDelete({_id:pid,owner:uid});if(p)await Task.deleteMany({project:pid});return p;}const p=memory.projects.find(x=>x._id===pid&&x.owner===uid);if(!p)return null;memory.projects=memory.projects.filter(x=>x._id!==pid);memory.tasks=memory.tasks.filter(x=>x.project!==pid);return p;}
export async function listTasks(uid,filters={}){
 if(isDB()){
  const projects=await Project.find({owner:uid}).select("_id");const query={project:{$in:projects.map(p=>p._id)}};
  if(filters.status)query.status=filters.status;if(filters.priority)query.priority=filters.priority;
  if(filters.projectId)query.project=filters.projectId;if(filters.search)query.title={$regex:filters.search,$options:"i"};
  return Task.find(query).populate("project","name").populate("assignee","name email").sort({createdAt:-1});
 }
 const pids=memory.projects.filter(p=>p.owner===uid).map(p=>p._id);
 return memory.tasks.filter(t=>pids.includes(t.project)&&(!filters.status||t.status===filters.status)&&(!filters.priority||t.priority===filters.priority)&&(!filters.projectId||t.project===filters.projectId)&&(!filters.search||t.title.toLowerCase().includes(filters.search.toLowerCase()))).sort((a,b)=>b.createdAt-a.createdAt).map(t=>({...t,project:memory.projects.find(p=>p._id===t.project)||null,assignee:memory.users.find(u=>u._id===t.assignee)||null}));
}
export async function getTask(tid,uid){const all=await listTasks(uid);return all.find(t=>String(t._id)===String(tid))||null;}
export async function createTask(data){return isDB()?Task.create(data):(memory.tasks.push({_id:id(),...data,createdAt:new Date()}),memory.tasks.at(-1));}
export async function updateTask(tid,uid,patch){const task=await getTask(tid,uid);if(!task)return null;if(isDB())return Task.findByIdAndUpdate(tid,patch,{new:true,runValidators:true}).populate("project","name").populate("assignee","name email");const raw=memory.tasks.find(t=>t._id===tid);Object.assign(raw,patch);return getTask(tid,uid);}
export async function deleteTask(tid,uid){const task=await getTask(tid,uid);if(!task)return null;if(isDB())return Task.findByIdAndDelete(tid);memory.tasks=memory.tasks.filter(t=>t._id!==tid);return task;}
export async function addActivity(data){return isDB()?Activity.create(data):(memory.activities.push({_id:id(),...data,createdAt:new Date()}),memory.activities.at(-1));}
export async function listActivities(uid,limit=30){
 if(isDB()){const projects=await Project.find({owner:uid}).select("_id");return Activity.find({project:{$in:projects.map(p=>p._id)}}).populate("actor","name email").sort({createdAt:-1}).limit(limit);}
 const pids=memory.projects.filter(p=>p.owner===uid).map(p=>p._id);
 return memory.activities.filter(a=>pids.includes(a.project)).sort((a,b)=>b.createdAt-a.createdAt).slice(0,limit).map(a=>({...a,actor:memory.users.find(u=>u._id===a.actor)||null}));
}
