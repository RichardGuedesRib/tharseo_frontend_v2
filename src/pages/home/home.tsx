import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigator = useNavigate();
  return (
    <div className="flex flex-1 flex-col pt-0 bg-bg-principal justify-center items-center w-full ">
      <div className="flex justify-around mt-4 w-full">
        <div>
          <img
            src="/images/tharseo.png"
            alt="Logo"
            className="mx-auto mb-4 w-64"
          />
        </div>
        <div className="flex gap-4">
          <Button
            className="rounded-full bg-[#2A303F] font-sans text-gray-400"   
            onClick={() => {
              navigator("/signin");
            }}
          >
            Acessar
          </Button>
          <Button className="rounded-full" variant={"default"}  onClick={() => {
              navigator("/signup");
            }}>
            Criar minha conta
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-8">
        <Button
          className="rounded-full bg-[#2A303F] font-sans text-gray-400"
          style={{
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
          }}
        >
          Automatizar{" "}
          <span className="rounded-full">
            <ArrowRight />
          </span>
        </Button>

        <span className="text-6xl text-white mt-8">Compre e</span>
        <span className="text-6xl text-white mt-2"> venda ativos</span>

        <span className="text-gray-200 text-center text-sm mt-8 font-light  ">
          Com o THARSEO você não precisa se preocupar com a compra e venda de
          <br /> ativos, basta configurar uma vez e acompanhar na sua
          plataforma.
        </span>

        <Button
          className="rounded-full mt-8"
          variant={"default"}
          style={{
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
          }}
          onClick={() => {
            navigator("/signup");
          }}
        >
          Começar
          <ChevronRight />
        </Button>

        <div
          className="flex justify-around items-center border border-gray-600 rounded-xl mt-8 p-4 py-2 gap-12 w-full"
          style={{
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
          }}
        >
          <span className="text-gray-500 text-center text-sm font-light">
            Comece selecionando os ativos que deseja acompanhar
          </span>
          <Button
            className="rounded-full"
            variant={"default"}
            style={{
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
            }}
          >
            Acompanhar
            <ChevronRight />
          </Button>
        </div>
      </div>

      <div>
        <img
          src="/images/tela2.png"
          alt="Logo"
          className="mx-auto mb-4 mt-10 "
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        <span className="text-6xl text-white mt-14 font-semibold">
          Liberdade
        </span>
        <span className="text-6xl text-white mt-2">de escolha</span>
        <img
          src="/images/tela3.png"
          alt="Logo"
          className="mx-auto mb-4 mt-14 "
        />
      </div>
      <span className="text-gray-200 text-center text-sm mt-8 font-light max-w-3xl">
        Criptomoedas populares como Bitcoin (BTC), Ethereum (ETH), Binance Coin
        (BNB), Solana (SOL) e muitos outros tokens. A plataforma oferece
        mercados de spot, futuros, margens, NFTs, entre outros. Além das
        principais criptomoedas,listagem de novos tokens regularmente,
        permitindo que os usuários participem de lançamentos e de novas
        oportunidades no mercado de criptoativos​
      </span>

      <section className="mt-16 flex justify-around text-white w-[80%]">
        <div className="flex items-center justify-start">
          <div>
            <p className="font-bold mb-4">
              {" "}
              <i className="fas fa-chart-line text-2xl mr-4"></i>Variedade e
              liberdade
            </p>
            <p>
              Escolha entre um catálogo
              <br /> repleto de ativos.
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <p className="font-bold mb-4">
              {" "}
              <i className="fas fa-lock text-2xl mr-4"></i>Rápido e seguro
            </p>
            <p>
              Transações seguras e de <br />
              fácil acompanhamento.
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <p className="font-bold mb-4">
              <i className="fas fa-exchange-alt text-2xl mr-4"></i>Liberdade de
              escolha
            </p>
            <p>
              Escolha na plataforma o que
              <br /> é relevante para você.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center mt-10">
        <span className="text-4xl text-white mt-8">
          Aumente seus ganhos com{" "}
        </span>
        <span className="text-4xl text-white mt-2"> automação de trading</span>

        <span className="text-gray-200 text-center text-lg mt-8 font-light  ">
          Automatize suas estratégias de compra e venda para capturar
          oportunidades 24/7.
          <br /> Experimente nossa plataforma hoje e maximize seus lucros sem
          esforço manual.
        </span>

        <Button
          className="rounded-full mt-8"
          variant={"default"}
          style={{
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
          }}
          onClick={() => {
            navigator("/signin");
          }}
        >
          Criar Conta
          <ChevronRight />
        </Button>
      </section>

      <footer className="mt-16 p-8 text-center flex w-full justify-around align-center items-center mb-24 text-white">
        <div className="text-2xl font-bold">
          <img
            src="/images/tharseo.png"
            alt="Logo THARSEO"
            className="mx-auto mb-4 w-64"
          />
        </div>
        <div className="mt-4 flex justify-center space-x-8">
          <div className="flex flex-col space-y-2 gap-1">
            <span className="font-semibold text-sm"> Conta </span>
            <span className="text-xs text-gray-400"> Acessar </span>
            <span className="text-xs text-gray-400"> Criar Conta </span>
          </div>
          <div className="flex flex-col space-y-2 gap-1">
            <span className="font-semibold text-sm"> Suporte </span>
            <span className="text-xs text-gray-400">
              {" "}
              Política de Privacidade{" "}
            </span>
            <span className="text-xs text-gray-400"> Termos e Condições </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
