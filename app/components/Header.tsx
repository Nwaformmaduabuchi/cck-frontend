

;
import { UserData } from "@/lib/types";
import { Bell,  } from "lucide-react";

import { MySidebarTrigger } from "./MySideBarTriger";


 
const Header = async ({LoggedInUser}:{LoggedInUser: UserData}) => {

  const {user,company} = LoggedInUser
   const names = company.name.split(" ");
   const logos:string[] = []
   names.forEach(name => logos.push(name.charAt(0).toLocaleUpperCase()));
  return (
    <header className=" z-50 w-full bg-[#f8f9ff]/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">

        <div className="flex min-w-0 items-center gap-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1f108e] text-xs font-bold text-white shadow-sm">
            {logos.slice(0, 1).join(",")}
          </div>

          <div>{names.slice(0, 1)}</div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button className="relative flex h-11 w-11 items-center justify-center rounded-lg text-[#464553] transition-colors hover:bg-[#eff4ff] hover:text-[#0b1c30]">
            <Bell className="h-5 w-5" />

            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#ba1a1a]" />
          </button>

          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#1f108e] text-lg font-semibold text-white">
            {user.email.charAt(0).toLocaleUpperCase()}
          </div>

          <div className="sm:hidden">
            <MySidebarTrigger />
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;



