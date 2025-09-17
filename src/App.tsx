// In your main App.jsx/App.tsx
import { Router,  Route } from "@solidjs/router";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import "./App.css";

function App() {
  return (
    <Router>
 
        <Route path="/" component={Login} />
        <Route path="/signup" component={Register} />
      
   
    </Router>
  );
}
export default App;