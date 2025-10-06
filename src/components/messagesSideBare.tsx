
const MessagesSideBare = () => {
  return (
    <div class="h-full w-full flex max-w-md flex-col  justify-between border-l border-gray-300 dark:border-gray-700 border-r backdrop-blur">
        <div class="p-4 flex-grow overflow-y-auto">
            <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Messages</h2>
            <ul class="space-y-4">
                <li  class="p-3 bg-slate-100 dark:bg-slate-800 reounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <div class="flex items
-center">
                        <img src="/avatar.png" alt="User Avatar" class="w-10 h-10 rounded-full mr-3"/>
                        <div>
                            <p class="font-medium text-gray-900 dark:text-gray-100">John Doe</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Hey! How are you?</p>
                        </div>
                    </div>
                </li>
                <li class="p-3 bg-slate-100 dark:bg-slate-800 reounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <div class="flex items-center">
                        <img src="/logo.png" alt="User Avatar" class="w-10 h-10 rounded-full mr-3"/>
                        <div>
                            <p class="font-medium text-gray-900 dark:text-gray-100">Jane Smith</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Are we still on for tomorrow?</p>
                        </div>
                    </div>
                </li>
                <li  class="p-3 bg-slate-100 dark:bg-slate-800 reounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <div class="flex items-center"> 
                        <img src="/tauri.svg" alt="User Avatar" class="w-10 h-10 rounded-full mr-3"/>
                        <div>
                            <p class="font-medium text-gray-900 dark:text-gray-100">Alice Johnson</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Check out this cool link!</p>
                        </div>
                    </div>
                </li>
            
            </ul>
        </div>
      
      
    </div>
  )
}

export default MessagesSideBare
