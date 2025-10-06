// App.tsx
import { Router, Route } from "@solidjs/router";
import { createSignal, onMount, Show } from "solid-js";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import UpgradeScreen from "./pages/Payement/UpgradeScreen";
import Dashboard from "./pages/workplace/Dashboard";
import SplashScreen from "./components/SplashScreen";
import Messanger from "./pages/workplace/Messanger";
import "./App.css";

// Create a theme context
const [theme, setTheme] = createSignal("light");
const [isLoading, setIsLoading] = createSignal(true);

// Function to toggle theme
const toggleTheme = () => {
  const newTheme = theme() === "light" ? "dark" : "light";
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);
  updateDocumentClass(newTheme);
};

// Update document class for Tailwind dark mode
const updateDocumentClass = (theme: string) => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

// Check for saved theme preference or respect system preference
onMount(async () => {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (savedTheme) {
    setTheme(savedTheme);
    updateDocumentClass(savedTheme);
  } else if (systemPrefersDark) {
    setTheme("dark");
    updateDocumentClass("dark");
  } else {
    setTheme("light");
    updateDocumentClass("light");
  }
  
  // Simulate app initialization (replace with actual initialization)

  setIsLoading(false);
});


function App() {
  return (
    <div class={theme() === "dark" ? "dark" : ""}>
      <Show when={!isLoading()} fallback={<SplashScreen />}>
        <Router>
          <Route path="/" component={Login} />
          <Route path="/signup" component={Register} />
          <Route path="/forgetpassword" component={ForgetPassword} />
          <Route path="/upgrade" component={UpgradeScreen} /> 
          <Route path="/dashboard" component={Dashboard} />
              <Route path="/messages" component={Messanger} />
        </Router>
      </Show>
    </div>
  );
}

export default App;
export { theme, toggleTheme };