import {ChainAllocation} from "@/components/chain-allocation";
import {PortfolioPerformance} from "@/components/portifolio-performance";
import { useEffect } from "react";
import {getWalletsUser} from "../../api/wallet/walletService";
import useWalletStore from "../../store/useWalletStore";

const Dashboard = () => {

  const { wallets, setWallets } = useWalletStore();

  const fetchWallets = async () => {
    try {
      const walletsData = await getWalletsUser(); 
      console.log("walletsData", walletsData);
      setWallets(walletsData); 
    } catch (error) {
      console.error("Erro ao buscar carteiras:", error);
    }
  };

  
  useEffect(() => {
    console.log("entrou na dash");
    fetchWallets();
  }, []);

  
  useEffect(() => {
    console.log("Conteúdo das wallets após atualização:", wallets);
  }, [wallets]); 

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4  bg-bg-principal  ">
      <div className="md:col-span-1 col-span-1 rounded-xl max-w-sm mx-auto">
        <ChainAllocation  />
      </div>
      <div className="md:col-span-2 col-span-1">
        <PortfolioPerformance />
      </div>
    </div>
  );
};

export default Dashboard;


