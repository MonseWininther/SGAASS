import { Route, Routes } from "react-router";
import Admin from "./Admin/admin_home";
import Hello from "./Students/hello";
import StudentLogOut from "./Students/studentLogOut";


function App() {


  return (
   <div>
    <Routes>
      <Route path="/" element={<Admin/>}/>
      <Route path="/entrada" element={<Hello/>}/>
      <Route path="/salida" element={<StudentLogOut/>}/>
    </Routes>
   </div>
  );
}

export default App;
