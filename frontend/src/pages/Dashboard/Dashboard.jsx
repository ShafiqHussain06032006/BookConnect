import { Outlet } from 'react-router-dom';
import SidebarProfile from '../../components/SidebarProfile/SidebarProfile';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <SidebarProfile />
      
      {/* Main Content Area - offset by sidebar width on larger screens */}
      <main className="lg:ml-72 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
