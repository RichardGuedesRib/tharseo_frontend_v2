import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout"; // Importa o layout com o Sidebar
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Dashboard from "@/pages/dashboard/dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* Rota para 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
