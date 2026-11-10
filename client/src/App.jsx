import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Board from "./pages/Board";
import Projects from "./pages/Projects";
import ActivityPage from "./pages/Activity";

function Protected({children}) {
  const {user,loading}=useAuth();
  if(loading)return <div className="loading-screen">Loading TaskMatrix...</div>;
  return user ? children : <Navigate to="/login" replace/>;
}
export default function App(){
 return <Routes>
  <Route path="/login" element={<AuthPage/>}/>
  <Route path="/register" element={<AuthPage mode="register"/>}/>
  <Route path="/" element={<Protected><Layout/></Protected>}>
   <Route index element={<Dashboard/>}/>
   <Route path="board" element={<Board/>}/>
   <Route path="projects" element={<Projects/>}/>
   <Route path="activity" element={<ActivityPage/>}/>
  </Route>
  <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes>;
}
