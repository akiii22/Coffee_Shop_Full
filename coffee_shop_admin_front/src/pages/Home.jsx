import DashboardCard from "../components/DashboardCard";
import SalesChart from "../components/SalesChart";
import OrderPieChart from "../components/OrderPieChart";
import RecentOrders from "../components/RecentOrders";

function Home() {
  return (
    <div className="min-h-screen space-y-6 bg-[#f8f5f2] p-6 font-sans">
      <h1 className="text-3xl font-bold text-[#4b2e05]">Dashboard Overview</h1>

      <DashboardCard />

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SalesChart />
        <OrderPieChart />
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
}

export default Home;
