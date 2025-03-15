import {ChainAllocation} from "@/components/chain-allocation";
import {PortfolioPerformance} from "@/components/portifolio-performance";
import { useEffect, useState } from "react";
import {getWalletsUser} from "../../api/wallet/walletService";
import useWalletStore from "../../store/useWalletStore";

const Dashboard = () => {

  const [isLoading, setIsLoading] = useState(false);
  const { wallets, setWallets } = useWalletStore();

  const fetchWallets = async () => {
    setIsLoading(true);
    try {
      console.log("isLoading", isLoading);
      const walletsData = await getWalletsUser(); 
      setWallets(walletsData);
      setIsLoading(false); 
    } catch (error) {
      console.error("Erro ao buscar carteiras:", error);
    }
  };
  
  useEffect(() => {
    fetchWallets();
  }, []);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4  bg-bg-principal  ">
      <div className="md:col-span-1 col-span-1 rounded-xl max-w-sm mx-auto">
        <ChainAllocation wallets={wallets}  />
      </div>
      <div className="md:col-span-2 col-span-1">
        <PortfolioPerformance />
      </div>
    </div>
  );
};

export default Dashboard;


