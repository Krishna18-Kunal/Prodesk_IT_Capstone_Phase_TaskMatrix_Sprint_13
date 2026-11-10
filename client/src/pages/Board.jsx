import { useEffect, useMemo, useState } from "react";
import { MoreHorizontal, Plus, Search, SlidersHorizontal } from "lucide-react";
import api from "../services/api";
import TaskModal from "../components/TaskModal";

const columns = [{id:"todo",label:"To do"},{id:"inprogress",label:"In progress"},{id:"review",label:"Review"},{id:"done",label:"Done"}];
export default function Board() {
  const [tasks,setTasks]=useState([]); const [projects,setProjects]=useState([]);
  const [modal,setModal]=useState(false); const [editing,setEditing]=useState(null);
  const [search,setSearch]=useState(""); const [priority,setPriority]=useState("all"); const [project,setProject]=useState("all");
  const [error,setError]=useState("");
  async function load(){try{const [t,p]=await Promise.all([api.get("/tasks"),api.get("/projects")]);setTasks(t.data.tasks);setProjects(p.data.projects);setError("");}catch(e){setError(e.response?.data?.message||"Unable to load tasks.");}}
  useEffect(()=>{load();},[]);
  const filtered=useMemo(()=>tasks.filter(t=>(!search||t.title.toLowerCase().includes(search.toLowerCase()))&&(priority==="all"||t.priority===priority)&&(project==="all"||(t.project?._id||t.project)===project)),[tasks,search,priority,project]);
  async function save(form){if(editing) await api.patch(`/tasks/${editing._id}`,form);else await api.post("/tasks",form);setEditing(null);await load();}
  async function move(id,status){try{await api.patch(`/tasks/${id}`,{status});await load();}catch(e){setError(e.response?.data?.message||"Could not move task.");}}
  function edit(t){setEditing(t);setModal(true);}
  async function remove(t){if(!confirm(`Delete "${t.title}"?`))return;await api.delete(`/tasks/${t._id}`);await load();}
  return <div>
    <div className="page-heading"><div><span className="eyebrow">PROJECT EXECUTION</span><h1>Task board</h1><p className="muted">Move work forward, one task at a time.</p></div><button className="btn-primary" onClick={()=>{setEditing(null);setModal(true);}}><Plus size={17}/> Add task</button></div>
    {error&&<div className="notice error">{error}</div>}
    <div className="board-toolbar"><div className="search-box"><Search size={17}/><input placeholder="Search tasks..." value={search} onChange={e=>setSearch(e.target.value)}/></div><div className="filter-box"><SlidersHorizontal size={16}/><select value={project} onChange={e=>setProject(e.target.value)}><option value="all">All projects</option>{projects.map(p=><option value={p._id} key={p._id}>{p.name}</option>)}</select><select value={priority} onChange={e=>setPriority(e.target.value)}><option value="all">All priorities</option>{["urgent","high","medium","low"].map(x=><option key={x} value={x}>{x[0].toUpperCase()+x.slice(1)}</option>)}</select></div></div>
    <div className="kanban-board">{columns.map(col=>{const items=filtered.filter(t=>t.status===col.id);return <section className="kanban-column" key={col.id} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const id=e.dataTransfer.getData("taskId");if(id)move(id,col.id);}}><div className="column-head"><div><span className={`column-indicator ${col.id}`}/><b>{col.label}</b><span className="count">{items.length}</span></div><button className="icon-button" onClick={()=>{setEditing(null);setModal(true);}}><Plus size={17}/></button></div><div className="column-cards">{items.map(t=><article className="task-card" key={t._id} draggable onDragStart={e=>e.dataTransfer.setData("taskId",t._id)}><div className="task-card-top"><span className={`priority-tag ${t.priority}`}>{t.priority}</span><button className="icon-button tiny" title="Task actions" onClick={()=>edit(t)}><MoreHorizontal size={17}/></button></div><h3 onClick={()=>edit(t)}>{t.title}</h3><p>{t.description || "No description added."}</p><div className="task-card-bottom"><span className="assignee-chip">{t.assignee?.name?.slice(0,1)||"U"}</span><span className="due-label">{t.dueDate?new Date(t.dueDate).toLocaleDateString():"No due date"}</span><button className="delete-link" onClick={()=>remove(t)}>Delete</button></div></article>)}
      {!items.length&&<div className="column-empty">Drop tasks here</div>}</div></section>})}</div>
    <TaskModal open={modal} onClose={()=>{setModal(false);setEditing(null);}} onSave={save} projects={projects} task={editing}/>
  </div>;
}
