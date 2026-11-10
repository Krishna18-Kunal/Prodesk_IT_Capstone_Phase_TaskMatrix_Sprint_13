import { useEffect, useState } from "react";
import { X } from "lucide-react";

const empty = { title: "", description: "", status: "todo", priority: "medium", dueDate: "", project: "", assigneeEmail: "" };

export default function TaskModal({ open, onClose, onSave, projects, task }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  useEffect(() => {
    if (open) setForm(task ? { ...empty, ...task, project: task.project?._id || task.project || "", assigneeEmail: task.assignee?.email || task.assigneeEmail || "", dueDate: task.dueDate ? String(task.dueDate).slice(0,10) : "" } : { ...empty, project: projects[0]?._id || "" });
    setError("");
  }, [open, task, projects]);
  if (!open) return null;
  const update = (key, value) => setForm(old => ({ ...old, [key]: value }));
  async function submit(e) {
    e.preventDefault();
    if (!form.title.trim()) return setError("Task title is required.");
    if (!form.project) return setError("Please create/select a project first.");
    try { await onSave(form); onClose(); } catch (err) { setError(err.response?.data?.message || "Could not save task."); }
  }
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <form className="modal" onSubmit={submit}>
      <div className="modal-head"><div><span className="eyebrow">WORK ITEM</span><h2>{task ? "Edit task" : "Create a task"}</h2></div><button type="button" className="icon-button" onClick={onClose}><X size={19}/></button></div>
      <label>Task title<input autoFocus value={form.title} onChange={e=>update("title",e.target.value)} placeholder="e.g. Build login screen"/></label>
      <label>Description<textarea rows="3" value={form.description} onChange={e=>update("description",e.target.value)} placeholder="What needs to be done?"/></label>
      <div className="form-grid">
        <label>Project<select value={form.project} onChange={e=>update("project",e.target.value)}>{projects.map(p=><option key={p._id} value={p._id}>{p.name}</option>)}</select></label>
        <label>Status<select value={form.status} onChange={e=>update("status",e.target.value)}><option value="todo">To do</option><option value="inprogress">In progress</option><option value="review">Review</option><option value="done">Done</option></select></label>
        <label>Priority<select value={form.priority} onChange={e=>update("priority",e.target.value)}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option></select></label>
        <label>Due date<input type="date" value={form.dueDate} onChange={e=>update("dueDate",e.target.value)}/></label>
      </div>
      <label>Assignee email<input type="email" value={form.assigneeEmail} onChange={e=>update("assigneeEmail",e.target.value)} placeholder="demo@taskmatrix.local"/></label>
      {error && <p className="form-error">{error}</p>}
      <div className="modal-actions"><button type="button" className="btn-secondary" onClick={onClose}>Cancel</button><button className="btn-primary" type="submit">{task ? "Save changes" : "Create task"}</button></div>
    </form>
  </div>;
}
