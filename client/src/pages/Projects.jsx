import { useEffect, useState } from "react";
import { FolderKanban, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Projects(){
 const [projects,setProjects]=useState([]);const [name,setName]=useState("");const [description,setDescription]=useState("");const [error,setError]=useState("");
 async function load(){try{const {data}=await api.get("/projects");setProjects(data.projects);}catch(e){setError(e.response?.data?.message||"Unable to load projects.");}}
 useEffect(()=>{load();},[]);
 async function create(e){e.preventDefault();try{await api.post("/projects",{name,description});setName("");setDescription("");setError("");load();}catch(e){setError(e.response?.data?.message||"Could not create project.");}}
 async function remove(id){if(!confirm("Delete this project and its tasks?"))return;await api.delete(`/projects/${id}`);load();}
 return <div><div className="page-heading"><div><span className="eyebrow">ORGANIZE YOUR WORK</span><h1>Projects</h1><p className="muted">Keep every initiative moving in the right direction.</p></div></div>
 {error&&<div className="notice error">{error}</div>}
 <form className="panel create-project" onSubmit={create}><div><h2>Create a project</h2><p className="muted">Start with a clear name and a short goal.</p></div><div className="create-project-fields"><input value={name} onChange={e=>setName(e.target.value)} placeholder="Project name" required/><input value={description} onChange={e=>setDescription(e.target.value)} placeholder="What is this project about?"/><button className="btn-primary"><Plus size={16}/> Create</button></div></form>
 <div className="project-grid">{projects.map(p=><article className="project-card" key={p._id}><div className="project-card-icon"><FolderKanban size={21}/></div><div className="project-card-actions"><button className="icon-button" onClick={()=>remove(p._id)} title="Delete project"><Trash2 size={16}/></button></div><h3>{p.name}</h3><p>{p.description||"No description yet."}</p><div className="project-card-foot"><span>{p.taskCount} tasks</span><Link to="/board">Open board →</Link></div><div className="progress-track"><div style={{width:`${p.progress}%`}}/></div></article>)}</div>
 {!projects.length&&<div className="empty-state panel">No projects yet. Create your first project above.</div>}
 </div>;
}
