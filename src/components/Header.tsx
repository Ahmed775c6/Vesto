
import { theme, toggleTheme } from "../App";

import {  Sun,Moon,BellRing,ChartNoAxesGantt } from 'lucide-solid';

type HeaderParams = {
  onToggle: () => void;
  // Remove these if Header doesn't use them:
  // sideBarCollapsed: boolean;
  // currentPage: string;
  // onPageChange: (pageId: string) => void;
}
const Header = ({ onToggle} :HeaderParams) => {
  return (
<header class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4">
<div class="flex items-center justify-between">
    {/*Left*/       }
<div class="flex items-center space-x-4">
<button onclick={onToggle} class=" text-xs p-2 rounded-lg text-slate-600  dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors dark:bg-slate-800">
  
<ChartNoAxesGantt />
</button>
<div class="hidden md:block">
    <h1 class="text-2xl font-black text-slate-800 dark:text-white">WorkSpace</h1>
    <p class="text-xs text-slate-700 dark:text-white">Welcome Back , Sakura ! </p>

</div>
</div>
    {/*Center*/       }
<div class="flex-1 max-w-md mx-8">
    <div class="relative">
<div class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"  >O</div>
        <input type="text" placeholder="Search" class="w-full
         pl-10 pr-4 py-2.5
          bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl
           text-slate-800 dark:text-white placeholder:slate-500 focus:outline-none focus:ring-2 
           focus:ring-sky-500 focus:border-transparent transition-all
           "/>
    </div>
<button class="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 "></button>    
</div>
    {/*Right*/       }

<div class="flex items-center space-x-3">

    <button class="hidden lg:flex items-center space-x-2 p-4 bg-gradient-to-r from-[#48D1CC] to-teal-800 text-white
    rounded-xl hover:shadow-lg transition-all">
        <div class="w-4 h-4"></div>
        <span class="text-sm font-medium">Upgrade</span>
    </button>
         {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            class="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 dark:text-slate-300 text-slate-600 dark:hover:bg-slate-800 transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {theme() === "light" ? (
              // Moon icon for dark mode
        <>
          <Moon class="w-4 h-4" />
        </>
            ) : (
              // Sun icon for light mode
      <Sun class = 'w-4 h-4' />
            )}
          </button>
            {/* Notification Button */}
                    <button 
          
            class="p-2.5 rounded-xl relative bg-slate-100 dark:bg-slate-700 dark:text-slate-300 text-slate-600 dark:hover:bg-slate-800 transition-colors duration-300"
          >
      <BellRing />
     <span class="absolute -top-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center right-0">0</span>
          </button>
     {/* user Button */}
     <div class="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700">

        <img src="/sakura2.png" alt="avatar"  class="w-8 h-8 rounded-full ring-2 ring-orange-500"/>
        <div class="hidden md:block">

            <p class="text-sm font-medium text-slate-500 dar:text-slate-400 ">Harnou Sakura</p>
            <p class="text-xs text-slate-500 dark:text-slate-400"> Adminasteur</p>
        </div>
     </div>

</div>
     
</div>
</header>
  )
}

export default Header
