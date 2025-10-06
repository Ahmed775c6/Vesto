import { ArrowLeftToLine, BarChart3, Calendar, ChevronDown, CreditCard, FileText, LayoutDashboard, MessagesSquare, Package, Settings, ShoppingBag, Users } from "lucide-solid"
import { createSignal, Show, For, createMemo } from "solid-js"

const menuItems = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    active: true,
    badge: "New",
  },
  {
    id: "analytics",
    icon: BarChart3,
    label: "Analytics",
    active: false,
    submenu: [
      { id: "overview", label: "Overview" },
      { id: 'reports', label: "Reports" },
      { id: "insight", label: "Insight" }
    ]
  },
  {
    id: "users",
    icon: Users,
    label: "Users",
    count: "2.4K", 
    submenu: [
      { id: "all-users", label: "All Users" },
      { id: "roles", label: 'Roles & Permissions' },
      { id: "activity", label: "Activity" }
    ]
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    label: "E-Commerce",
    submenu: [
      { id: "products", label: "Products" },
      { id: "orders", label: "Orders" },
      { id: "customers", label: "Customers" }
    ]
  },
  {
    id: "inventory",
    icon: Package, 
    label: "Inventory",
    count: "847",
  },
  {
    id: "transactions",
    icon: CreditCard,
    label: "Transactions",
  },
  {
    id: "messages",
    icon: MessagesSquare,
    label: "Messages",
    badge: "12",
  },
  {
    id: "calendar",
    icon: Calendar,
    label: "Calendar"
  },
  {
    id: "reports",
    icon: FileText,
    label: "Reports"
  },
  {
    id: "settings",
    icon: Settings,
    label: "Settings"
  }
]

type Params = {
  collapsed: boolean,
  currentPage: string,
 onToggle: () => void;
  onPageChange: (pageId: string) => void
}

const SideBar = (props: Params) => {
  // Create a reactive memo for collapsed state
  const isCollapsed = createMemo(() => props.collapsed);
  const [openSubmenus, setOpenSubmenus] = createSignal<Set<string>>(new Set());

  const toggleSubmenu = (itemId: string) => {
    setOpenSubmenus(prev => {
      const newSet = new Set(prev);
      newSet.has(itemId) ? newSet.delete(itemId) : newSet.add(itemId);
      return newSet;
    });
  };

  const handleItemClick = (itemId: string,ITEMnAME  : string,hasSubmenu: boolean) => {
    if (hasSubmenu) {
      toggleSubmenu(itemId);
      window.location.href = "#"; // Prevent navigation for items with submenu
    } else {
      props.onPageChange(itemId);
      window.location.href = `${ITEMnAME}`; // Prevent default navigation
    }
  };

  return (
<div class={`${isCollapsed() == true ? "w-0 sm:w-20" : "w-72 fixed dark:bg-slate-900 bg-white  top-0 left-0"} 
            flex transition-all duration-300 ease-in-out 
            bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl 
            border-r border-slate-200/50 dark:border-slate-700/50 
            flex-col fixed top-0 left-0 z-50
            h-screen overflow-hidden
            sm:relative sm:z-10`}>
      {/* Logo */}
      <div class="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div class="flex items-center space-x-3">
          <div class="shadow-lg w-10 h-10 p-4 justify-center items-center flex rounded-xl bg-gradient-to-r from-[#5A7DFF] to-[#4169E1]">
            <div class="w-6 h-6 rounded-md bg-[#4169E1] flex items-center justify-center">
              <span class="font-bold text-white">Vesto</span>
            </div>
          </div>
          <Show when={!isCollapsed()}>
            <div class="text-xl font-bold text-slate-800 w-full flex items-center justify-between dark:text-white">
           <div class="flex flex-col">
               <h1 class="text-xl font-bold text-slate-800 dark:text-white">Vesto</h1>
              <p class="text-xs text-slate-500 dark:text-slate-400">Admin Panel</p>
           </div>
         
             <ArrowLeftToLine class="cursor-pointer   flex sm:hidden" onclick={props.onToggle} />
            </div>
 
          </Show>
        </div>
      </div>

      {/* Links */}
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <For each={menuItems}>
          {(item) => (
            <div class="bg-transparent">
              <button
                onClick={() => handleItemClick(item.id, item.label,!!item.submenu)}
                class={`w-full flex items-center bg-transparent text-gray-900 dark:text-white gap-3 p-3 rounded-xl transition-all duration-200
                  ${props.currentPage === item.id 
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/75" 
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                  }`}
              >
                <div class="flex items-center space-x-3">
                  {item.icon && <item.icon class="w-5 h-5" />}
                </div>
                <Show when={!isCollapsed()}>
                  <span class="font-medium ml-2">{item.label}</span>
                  {item.badge && (
                    <span class="px-2 py-1 text-xs bg-rose-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {item.count && (
                    <span class="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-white rounded-full">
                      {item.count}
                    </span>
                  )}
                  {item.submenu && (
                    <ChevronDown class={`w-4 h-4 transition-transform ${
                      openSubmenus().has(item.id) ? 'rotate-180' : ''
                    }`}/>
                  )}
                </Show>
              </button>

              <Show when={!isCollapsed() && item.submenu && openSubmenus().has(item.id)}>
                <div class="mt-2 space-y-1">
                  <For each={item.submenu}>
                    {(subItem) => (
                      <button 
                        onClick={() => props.onPageChange(subItem.id)}
                        class="w-full text-left p-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 bg-white dark:bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-all"
                      >
                        {subItem.label}
                      </button>
                    )}
                  </For>
                </div>
              </Show>
            </div>
          )}
        </For>
      </nav>

      {/* User Profile */}
      <div class="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
        <Show 
          when={!isCollapsed()} 
          fallback={
            <div class="flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <img 
                src="/sakura2.png" 
                alt="user" 
                class="w-10 h-10 rounded-full ring-2 ring-orange-500 object-cover"
              />
            </div>
          }
        >
          <div class="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <img 
              src="/sakura2.png" 
              alt="user" 
              class="w-10 h-10 rounded-full ring-2 ring-orange-500 object-cover"
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-slate-800 dark:text-white truncate">
                Sakura Hanrou
              </p>
              <p class="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
                role: Administrateur
              </p>
            </div>
          </div>
        </Show>
      </div>
    </div>
  )
}

export default SideBar