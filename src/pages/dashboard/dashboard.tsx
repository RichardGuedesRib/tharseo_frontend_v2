import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore"; 

const Dashboard = () => {
  // Acessando o estado do store de forma eficiente
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <h1>Dashboard</h1>
      
      <Link to="#">Ir para Sobre</Link>

      {/* Exibe o estado armazenado */}
      <div className="mt-4">
        {user ? (
          <div className="bg-green-500 text-white p-4 rounded-xl">
            <h2>Bem-vindo, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <p>Balance: {user.balance}</p>
            <p>Level: {user.levelUser}</p>
          </div>
        ) : (
          <div className="bg-red-500 text-white p-4 rounded-xl">
            <p>Usuário não autenticado!</p>
          </div>
        )}
      </div>

      <div className="bg-blue-500 text-white p-4 ml-4 rounded-xl">
        Tailwind está funcionando! 🚀
      </div>
    </div>
  );
};

export default Dashboard;
