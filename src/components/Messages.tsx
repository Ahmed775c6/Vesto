
const Messages = () => {
  return (
    <div class="w-full h-full bg-transparent flex flex-col ">
        <header class="w-full p-4 border-b border-slate-400 ">Messages</header>
        <div class="w-full h-full overflow-auto p-4 flex flex-col gap-3 max-h-[70vh]">
            
        </div>
        <div class="p-4 border-t border-gray-300 dark:border-gray-700">
            <input type="text" placeholder="Type a message..." class="w-full bg-white p-2 border border-gray-300 dark:border-gray-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-sky-800 dark:bg-slate-800 dark:text-gray-200"/>
        </div>
    </div>
  )
}

export default Messages
