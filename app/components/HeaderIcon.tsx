"use client";

import {  useSidebar } from "@/components/ui/sidebar";
import { ShoppingCart } from "lucide-react";
import { MySidebarTrigger } from "./MySideBarTriger";
import { useEffect, useState } from "react";
import { UserData } from "@/lib/types";
import { get_user } from "@/lib/Api";

export function SidebarBrand() {
  
  const { state } = useSidebar();
  
  return ( 
    <div className="">
      {state === "collapsed" ? (
        <div className="text-center mx-auto" ><MySidebarTrigger /></div>
      ) : (
        <div className="flex justify-between">
          <div className="flex">
            <div className="flex size-8 ml-2 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShoppingCart className="size-4" />
          </div>

          <div className="ml-3">
            <p className="font-semibold">CCK</p>
            <p className="text-xs text-muted-foreground">
              Home For Luxury Wares
            </p>
          </div>
          </div>
          <MySidebarTrigger />
          
        </div>

      )}
    </div>
  );
}