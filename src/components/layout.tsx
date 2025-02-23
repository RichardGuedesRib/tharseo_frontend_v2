import { Outlet, } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const Layout = () => {



  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 bg-bg-principal text-white">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1"></SidebarTrigger>
         
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-bg-principal">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
