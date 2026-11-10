import { useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, CircleAlert, Clock3, ListTodo, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";
import TaskModal from "../components/TaskModal";

const nice = s => ({todo:"To do",inprogress:"In progress",review:"Review",done:"Done"}[s] || s);
export default function Dashboard() {
  const [data,setData] = useState({metrics:{},projects:[],activities:[]});
  const [tasks,setTasks] = useState([]);
  const [projects,setProjects] = useState([]);
  const [modal,setModal] = useState(false);
  const [error,setError] = useState("");
  async function load() {
    try { const [d,t,p] = await Promise.all([api.get("/dashboard"),api.get("/tasks"),api.get("/projects")]); setData(d.data); setTasks(t.data.tasks); setProjects(p.data.projects); setError(""); }
    catch(e) { setError(e.response?.data?.message || "Unable to load dashboard."); }
  }
  useEffect(()=>{load();},[]);
  async function saveTask(form) { await api.post("/tasks",form); await load(); }
  const m = data.metrics || {};
  const cards = [
    ["Total tasks",m.total || 0,ListTodo,"#7c8cff"],
    ["In progress",m.inProgress || 0,Clock3,"#e7a84c"],
    ["Completed",m.completed || 0,CheckCircle2,"#3ec99a"],
    ["Overdue",m.overdue || 0,CircleAlert,"#ef7c83"]
  ];
  return <div>
    <div className="page-heading"><div><span className="eyebrow">MONDAY, YOUR WORKSPACE</span><h1>Good to see you again <span className="wave">✦</span></h1><p className="muted">Here's what's happening across your projects.</p></div><button className="btn-primary" onClick={()=>setModal(true)}><Plus size={17}/> New task</button></div>
    {error && <div className="notice error">{error}</div>}
    <div className="stats-grid">{cards.map(([label,value,Icon,color])=><div className="stat-card" key={label}><div className="stat-top"><span>{label}</span><span className="stat-icon" style={{color}}><Icon size={18}/></span></div><strong>{value}</strong><span className="stat-caption">{label === "Overdue" ? "Needs attention" : "Across your workspace"}</span></div>)}</div>
    <div className="content-grid">
      <section className="panel"><div className="section-head"><div><h2>Project progress</h2><p className="muted">A snapshot of active work</p></div><Link to="/projects" className="text-link">All projects <ArrowUpRight size={15}/></Link></div>
        {data.projects?.length ? <div className="project-progress-list">{data.projects.map(p=><div className="progress-row" key={p._id}><div className="progress-info"><div><b>{p.name}</b><span>{p.taskCount} tasks</span></div><strong>{p.progress}%</strong></div><div className="progress-track"><div style={{width:`${p.progress}%`}}/></div></div>)}</div> : <div className="empty-state">No projects yet. Create your first project to get started.</div>}
      </section>
      <section className="panel"><div className="section-head"><div><h2>Recent activity</h2><p className="muted">Latest team updates</p></div><Link to="/activity" className="text-link">View all <ArrowUpRight size={15}/></Link></div>
        <div className="activity-list">{(data.activities || []).slice(0,5).map(a=><div className="activity-item" key={a._id}><div className="activity-avatar">{a.actor?.name?.slice(0,1) || "T"}</div><div><p>{a.message}</p><span>{a.actor?.name || "Team member"} · {new Date(a.createdAt).toLocaleString()}</span></div></div>)}</div>
      </section>
    </div>
    <section className="panel task-preview"><div className="section-head"><div><h2>My latest tasks</h2><p className="muted">Work that needs your attention</p></div><Link to="/board" className="text-link">Open board <ArrowUpRight size={15}/></Link></div>
      {tasks.slice(0,5).map(t=><div className="task-row" key={t._id}><div className={`priority-dot ${t.priority}`}/><div className="task-row-title"><b>{t.title}</b><span>{t.project?.name || "Project"}</span></div><span className={`status-pill ${t.status}`}>{nice(t.status)}</span><span className="task-date">{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "No due date"}</span></div>)}
      {!tasks.length && <div className="empty-state">No tasks yet. Add a task to see it here.</div>}
    </section>
    <TaskModal open={modal} onClose={()=>setModal(false)} onSave={saveTask} projects={projects}/>
  </div>;
}
