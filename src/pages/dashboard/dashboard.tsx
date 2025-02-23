import {ChainAllocation} from "@/components/chain-allocation";
import {PortfolioPerformance} from "@/components/portifolio-performance";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4  bg-bg-principal min-h-screen ">
      <div className="md:col-span-1 col-span-1 bg-gray-800 rounded-xl ">
        <ChainAllocation />
      </div>
      <div className="md:col-span-2 col-span-1">
        <PortfolioPerformance />
      </div>
    </div>
  );
};

export default Dashboard;


