import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Dash</h1>
      <Link to="#">Ir para Sobre</Link>
      <div className="bg-blue-500 text-white p-4 ml-4 rounded-xl">
      Tailwind está funcionando! 🚀
    </div>
    </div>
  );
};

export default Dashboard;
