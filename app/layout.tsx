import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { GoogleOAuthProvider } from "@react-oauth/google";

import { AppSidebar } from "@/app/components/AppSideBar"
import { ChevronLeft, Menu } from "lucide-react";
import { MySidebarTrigger } from "./components/MySideBarTriger";


export const metadata = {
  title: "Inventory Management POS",
  description: "Manage your store and inventory",
  manifest: "/manifest.json",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});



export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  
  
  return (
      <html lang="en" 
            className={`${roboto.variable} ${poppins.variable} font-sans antialiased`}>
      <body>
        <GoogleOAuthProvider clientId={process.env.NEXT_GOOGLE_CLIENT_ID!}>
            <main className="flex-1 w-full overflow-x-hidden transition-all duration-300 ease-in-out">
              {children}      
            </main>
         
      </GoogleOAuthProvider>
      </body>
    </html>
    
  );
}
