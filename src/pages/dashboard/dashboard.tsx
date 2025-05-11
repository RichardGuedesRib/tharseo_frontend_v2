import {ChainAllocation} from "@/components/chain-allocation";
import {PortfolioPerformance} from "@/components/portifolio-performance";
import { useEffect, useState } from "react";
import {getWalletsUser} from "../../api/wallet/walletService";
import useWalletStore from "../../store/useWalletStore";
import { getStrategiesUser } from "../../api/strategy/strategyService";
import { getTradeflowUser } from "../../api/tradeflow/tradeflowService";
import { getAssets } from "@/api/asset/assetService";
import {getOrderUser} from "../../api/order/orderService";
import { Wallet } from "@/models/Wallet";
import usePortfolioStore from "@/store/usePortfolioStore";


const Dashboard = () => {

  const [isLoading, setIsLoading] = useState(false);
  const { wallets, setWallets, updatePriceForAsset } = useWalletStore();
  const [total, setTotal] = useState(0);

  const { setTotalValue, setTotalQuantity, setSymbol } = usePortfolioStore();

  const fetchDataUser = async () => {
    setIsLoading(true);
    try {
      const walletsData = await getWalletsUser();
      await getStrategiesUser(); 
      await getTradeflowUser();
      await getAssets();
      await getOrderUser();
      setWallets(walletsData);


      walletsData.forEach((wallet : Wallet) => {
        updatePriceForAsset(wallet.asset.symbol); 
      });
     
      setTotalValue(wallets[0].totalValueUSD!);
      setTotalQuantity(Number(wallets[0].quantity!));
      setSymbol(wallets[0].asset.symbol);

      setIsLoading(false); 
      
      
    } catch (error) {
      console.error("Erro ao buscar carteiras:", error);
    }
  };
  
  useEffect(() => {
    fetchDataUser();
  }, []);

  useEffect(() => {
    if(wallets){
      const total = wallets.reduce((acc, wallet) => acc + (wallet.totalValueUSD || 0), 0);
      setTotal(total);
    }
    
  }, [wallets]); 
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4  bg-bg-principal  ">
      <div className="md:col-span-1 col-span-1 rounded-xl max-w-sm mx-auto">
        <ChainAllocation wallets={wallets} total={total} />
      </div>
      <div className="md:col-span-2 col-span-1">
        <PortfolioPerformance />
      </div>
    </div>
  );
};

export default Dashboard;


