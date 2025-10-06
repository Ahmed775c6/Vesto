import { createSignal } from 'solid-js';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import CategoryChart from '../../components/charts/CategoryChart';
import ChartBarRevenu from '../../components/charts/ChartBarRevenu';
import Cardstates from '../../components/Cardstates';
import Table from '../../components/Tabels/Table';
import Navbar from '../../components/Navbar';
import TopProductsTable from '../../components/Tabels/TopProductsTable';
import ActivityFeeds from '../../components/ActivityFeeds';
import Footer from '../../components/Footer';

const Dashboard = () => {
  const [sideBarCollapsed, setSideBarCollapsed] = createSignal(true);
  const [currentPage, setCurrentPage] = createSignal('dashboard');

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
            <div class="p-6 space-y-6">
              <Cardstates/>
            </div>
            {/**charts */}
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-3">
              <div class="xl:col-span-2 p-4">
                    <Table/>
             
              </div>
              <div class="space-y-6 p-4">
                <ActivityFeeds/>
            
              </div>
            </div>
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div class="xl:col-span-2">
               <ChartBarRevenu/>
                <TopProductsTable/>
              </div>
              <div class='p-4'>
    <CategoryChart/>
              </div>
            </div>
                 <Footer/>
          </main>
              
        </div>
   
      </div>
    </div>
  );
};

export default Dashboard;