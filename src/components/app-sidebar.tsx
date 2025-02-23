import * as React from "react"
import {
  BadgeDollarSign,
  ChartCandlestick,
  ChartScatter,
  Cog,
  FileStack,
  LayoutDashboard,
  LifeBuoy,
  Send,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"



const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
     
    },
    {
      title: "Estratégias",
      url: "#",
      icon: ChartScatter,
      isActive: true,
     
    },
    {
      title: "Trade",
      url: "#",
      icon: ChartCandlestick,
    
    },
    {
      title: "Em Andamento",
      url: "#",
      icon: BadgeDollarSign,
    
    },
    {
      title: "Histórico",
      url: "#",
      icon: FileStack,
     
    },
    {
      title: "Configurações",
      url: "#",
      icon: Cog,
     
    },
  ],
  navSecondary: [
    {
      title: "Suporte",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
 
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props} collapsible="icon">
      <SidebarHeader className="group">
      <SidebarMenu>
        <SidebarMenuItem>
            <a href="/dashboard" className="flex items-center justify-center mt-2">
              <img
                src="/images/tharseo.png"
                alt="Logo"
                className=" group-data-[collapsed]:hidden"
              />

              <span className="size-8 font-bold text-lg hidden group-data-[collapsed]:flex items-center justify-center">
                T
              </span>
            </a>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
      <SidebarContent className="text-text-primary">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto text-text-primary" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
