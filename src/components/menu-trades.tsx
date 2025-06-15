import { Bot, ChartNetwork, CirclePlay } from "lucide-react";
import { Link } from "react-router-dom";

export default function MenuTrade () {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl w-full">
        <Link
          to="/fast-guide"
          className="flex items-center justify-center border border-white rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-200 p-1"
        >
          <div className="flex size-10 items-center justify-center text-white">
            <CirclePlay className="size-5" />
          </div>
          <p className="text-sm font-semibold text-white ml-2">Guia rápido</p>
        </Link>

        <Link
          to="/trades"
          className="flex items-center justify-center border border-white rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-200 p-1"
        >
          <div className="flex size-10 items-center justify-center text-white">
            <Bot className="size-5" />
          </div>
          <p className="text-sm font-semibold text-white ml-2">Automações</p>
        </Link>

        <Link
          to="/open-trades"
          className="flex items-center justify-center border border-white rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-200 p-1"
        >
          <div className="flex size-10 items-center justify-center text-white">
            <ChartNetwork className="size-5" />
          </div>
          <p className="text-sm font-semibold text-white ml-2">BackTesting</p>
        </Link>
      </div>
    )
}