"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu, X } from "lucide-react";

export function MySidebarTrigger() {
  const {
    toggleSidebar,
    state,
    openMobile,
    isMobile,
  } = useSidebar();

  const isOpen = isMobile ? openMobile : state === "expanded";

  return (
    <Button
      variant={isOpen ? "destructive" : "default"}
      size="icon"
      onClick={toggleSidebar}
      className="flex items-center justify-center"
    >
      {isOpen ? (
        <X className="size-5" />
      ) : (
        <Menu className="size-5" />
      )}
    </Button>
  );
}