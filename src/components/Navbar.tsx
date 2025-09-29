import { Menu ,Sun,Moon} from "lucide-solid"
import { theme, toggleTheme } from "../App";
type HeaderParams = {
  onToggle: () => void;
  sideBarCollapsed: boolean; // Add this prop
}

const Navbar = ({ onToggle, sideBarCollapsed }: HeaderParams) => {
  return (
    <nav class="w-full items-center justify-between p-3 dark:border-b-[1px] dark:border-slate-800 border-b[0] bg-white dark:bg-slate-900/80 flex transition-all shadow-sm">
      <Menu 
        class="cursor-pointer text-slate-500 dark:text-white" 
        onclick={onToggle}
      />
      
      {/* This ensures Navbar reacts to sidebar state changes */}
 <div class="flex gap-3 items-center">
              <button 
            onClick={toggleTheme}
            class="w-10 h-10 flex items-center justify-center text-center rounded-md bg-slate-100 dark:bg-slate-700 dark:text-slate-300 text-slate-600 dark:hover:bg-slate-800 transition-colors duration-300"
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
      <div class={`flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 ${sideBarCollapsed ? 'opacity-100' : 'opacity-100'}`}>
        <img src="/sakura2.png" alt="user" class="w-10 h-10 rounded-full ring-2 ring-orange-500 object-cover"/>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-slate-800 dark:text-white truncate">Sakura Hanrou</p>
          <p class="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">role : Administrateur</p>
        </div>
      </div>
 </div>
    </nav>
  )
}

export default Navbar