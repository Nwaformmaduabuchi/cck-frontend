

import { Command, Quote } from "lucide-react";

import { SignupForm } from "@/app/components/SignUpForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full font-sans">
      
      
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-slate-900 p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-position-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        <div className="relative z-10 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg">
            <Command className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Store Master</span>
        </div>

        <div className="relative z-10 max-w-lg mb-12">
          <Quote className="h-10 w-10 text-indigo-400/50 mb-6" />
          <p className="text-3xl font-semibold leading-snug text-slate-100 mb-6">
            "Join Store Master today and take full control of your checkout speed and automated payments."
          </p>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-200 border border-indigo-500/30">
              MO
            </div>
            <div>
              <p className="font-semibold text-white">Michael O.</p>
              <p className="text-sm text-slate-400">Owner, Prime Pipes & Hardware</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 lg:p-24 relative bg-slate-900 lg:bg-white lg:dark:bg-slate-950 overflow-hidden">
        
      
        <div className="absolute inset-0 lg:hidden bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-position-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

     
        <div className="absolute top-8 left-8 flex items-center gap-2 lg:hidden z-10">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
            <Command className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white lg:text-slate-900 lg:dark:text-white">Store Master</span>
        </div>

        
        <div className="w-full max-w-md relative z-10">
          <SignupForm />
        </div>
      </div>
      
    </div>
  );
}