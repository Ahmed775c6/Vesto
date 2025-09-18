// In your main App.jsx/App.tsx
import { Router,  Route } from "@solidjs/router";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import UpgradeScreen from "./pages/Payement/UpgradeScreen";
import "./App.css";

function App() {
  return (
    <Router>
 
        <Route path="/" component={Login} />
        <Route path="/signup" component={Register} />
             <Route path="/forgetpassword" component={ForgetPassword} />
      
    <Route path="/upgrade" component={UpgradeScreen} /> 
    </Router>
  );
}
export default App;