import { randomUUID } from "node:crypto";
const store = { users: [], projects: [], tasks: [], activities: [] };
export const id = () => randomUUID();
export const memory = store;
export function seedMemory() {
  if (store.users.length) return;
  const user = { _id: id(), name: "Demo User", email: "demo@taskmatrix.local", passwordHash: null, createdAt: new Date() };
  store.users.push(user);
  const p1 = { _id: id(), name: "Website Revamp", description: "Refresh the product website and improve onboarding.", owner: user._id, createdAt: new Date() };
  const p2 = { _id: id(), name: "Mobile Experience", description: "Make core workflows work beautifully on mobile.", owner: user._id, createdAt: new Date() };
  store.projects.push(p1,p2);
  const add = (title,status,priority,project,days) => store.tasks.push({
    _id:id(),title,description:"Demo task — edit this card to add your own details.",status,priority,project:project._id,assignee:user._id,createdBy:user._id,
    dueDate: days ? new Date(Date.now()+days*86400000) : null,createdAt:new Date()
  });
  add("Design the new dashboard","done","medium",p1,-2);
  add("Build authentication API","inprogress","high",p1,3);
  add("Create onboarding checklist","todo","low",p1,7);
  add("Review mobile navigation","review","medium",p2,2);
  store.activities.push({ _id:id(),actor:user._id,project:p1._id,action:"seed",message:"TaskMatrix demo workspace is ready.",createdAt:new Date() });
}
