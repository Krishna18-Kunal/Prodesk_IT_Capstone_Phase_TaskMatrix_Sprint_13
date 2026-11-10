import { useEffect, useState } from "react";
import { Activity as ActivityIcon } from "lucide-react";
import api from "../services/api";
export default function ActivityPage(){
 const [items,setItems]=useState([]);const [error,setError]=useState("");
 useEffect(()=>{api.get("/activities").then(({data})=>setItems(data.activities)).catch(e=>setError(e.response?.data?.message||"Unable to load activity."));},[]);
 return <div><div className="page-heading"><div><span className="eyebrow">TEAM TIMELINE</span><h1>Activity</h1><p className="muted">A shared record of recent project updates.</p></div></div>{error&&<div className="notice error">{error}</div>}<section className="panel"><div className="section-head"><div><h2>Recent updates</h2><p className="muted">Most recent first</p></div><ActivityIcon size={19}/></div>{items.map(a=><div className="activity-item activity-page-item" key={a._id}><div className="activity-avatar">{a.actor?.name?.slice(0,1)||"T"}</div><div><p>{a.message}</p><span>{a.actor?.name||"Team member"} · {new Date(a.createdAt).toLocaleString()}</span></div></div>)}{!items.length&&<div className="empty-state">No activity recorded yet.</div>}</section></div>;
}
