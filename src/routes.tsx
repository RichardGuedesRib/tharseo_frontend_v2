import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Dashboard from "@/pages/dashboard/dashboard";
import Wallet from "@/pages/wallet/wallet";
import PrivateRoute from "@/services/PrivateRoute"; 
import OpenTrades from "@/pages/open-trades/open-trades";
import Historics from "@/pages/historics/historics";
import Settings from "@/pages/settings/settings";
import Strategys from "@/pages/strategys/strategys";
import Trades from "@/pages/trades/trades";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="open-trades" element={<OpenTrades/>} />
            <Route path="historics" element={<Historics/>} />
            <Route path="settings" element={<Settings/>} />
            <Route path="strategys" element={<Strategys/>} />
            <Route path="trades" element={<Trades/>} />
            

          </Route>
        </Route>

        {/* Rota para 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
