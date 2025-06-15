
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Bot} from "lucide-react";

/**
 * Componente para exibir uma página de desenvolvimento, com um
 * loading animation e um texto de feedback.
 *
 * @returns {JSX.Element} O JSX do componente.
 */
export default function Development() {
  return (
    <div className="container h-screen max-h-96 flex justify-center items-center text-white 	">
      <div className="flex flex-col justify-center items-center max-w-2xl space-y-8">
        <div className="space-y-4">
          <div className="flex gap-4 items-center justify-center">
            <Bot className="w-10 h-10 animate-bounce" />
            <h3 className="font-bold text-2xl text-center">
              Opa! Estamos quase lá!
            </h3>
          </div>

          <p className="text-center">
            Estamos trabalhando duro para tornar o nosso site mais completo e
            funcional. Agradecemos sua paciência enquanto trabalhamos para
            melhorar nossa plataforma.
          </p>
        </div>
        <Link to="/dashboard">
          <Button variant={"default"}>Ir para o Início</Button>
        </Link>
      </div>
    </div>
  );
}

