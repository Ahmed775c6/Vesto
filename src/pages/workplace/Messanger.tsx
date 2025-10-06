import { createSignal } from 'solid-js';
import SideBar from '../../components/SideBar';

import Navbar from '../../components/Navbar';

import Footer from '../../components/Footer';
import Messages from '../../components/Messages';
import MessagesSideBare from '../../components/messagesSideBare';
const Messanger = () => {
  const [sideBarCollapsed, setSideBarCollapsed] = createSignal(true);
  const [currentPage, setCurrentPage] = createSignal('messages');

  const handleToggle = () => {
    console.log("Toggling sidebar", sideBarCollapsed());
    setSideBarCollapsed(!sideBarCollapsed());
  };

  const handlePageChange = (pageId: string) => {
    setCurrentPage(pageId);
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      <div class="flex h-screen overflow-hidden">
        <SideBar 
          collapsed={sideBarCollapsed()} 
                      onToggle={handleToggle}
          currentPage={currentPage()} 
          onPageChange={handlePageChange} 
        />
        <div class="flex-1 flex-col flex overflow-hidden">
    
          <Navbar 
            onToggle={handleToggle}
            sideBarCollapsed={sideBarCollapsed()} // Pass the state to Navbar
          />
          <main class='flex-1 overflow-y-auto bg-transparent'>
     <div class=" h-[81vh] w-full flex">

      <MessagesSideBare/>
      <Messages/>
     </div>
                 <Footer/>
          </main>
              
        </div>
   
      </div>
    </div>
  );
};

export default Messanger;