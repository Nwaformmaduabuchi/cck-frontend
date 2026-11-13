import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins, Roboto } from "next/font/google";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { GoogleOAuthProvider } from "@react-oauth/google";

import { AppSidebar } from "@/app/components/AppSideBar"
import { Toaster } from "@/components/ui/sonner";
import Header from "../components/Header";
import { get_user } from "@/lib/Api"; // Note: Adjust if your import path is different
import Footer from "../components/Footer";
import { UserData } from "@/lib/types"; // Adjust this import path to your types.ts file

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

export const metadata: Metadata = {
  title: "CCK Retail",
  description: "Inventory, sales, and stock movement workspace.",
};

export default async function OverviewLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  
  // 1. Fetch the raw response which looks like { success: boolean, data: UserData }
  // Inside your OverviewLayout function:

  // 1. Fetch the data
  const response = await get_user();

  // 2. Extract the data safely. If it fails, pass an empty object.
  // The Header will now catch this empty object and apply those safe fallbacks!
  const userData: UserData = response.data  


  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_GOOGLE_CLIENT_ID!}>
      <SidebarProvider className="flex w-full">
        <AppSidebar />
        <SidebarInset className="flex h-screen flex-col overflow-hidden">
          
          <Header LoggedInUser={userData} />

          <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950">
            {children}
            <Footer />
          </main>

        </SidebarInset>
       <Toaster
          richColors
          closeButton
          position="bottom-center" 
        />
      </SidebarProvider>
    </GoogleOAuthProvider>
  );
}
