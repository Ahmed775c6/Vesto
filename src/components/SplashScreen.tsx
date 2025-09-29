// components/SplashScreen.tsx

import { theme } from "../App";
import "./styles/splash.css"
import Loading from "./Loading";
const SplashScreen = () => {
  const isDark = () => theme() === "dark";
  
  return (
    <div class="flex items-center justify-center h-screen w-screen transition-colors duration-500"
         classList={{"bg-gradient-to-br from-gray-900 to-gray-800": isDark(), 
                    "bg-gradient-to-br from-blue-50 to-white": !isDark()}}>
    <Loading/>
    </div>
  );
};

export default SplashScreen;