import React from "react";
import { CompanyForm } from "../components/CompanyRegisterForm";

const Page = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-position-[24px_24px]"></div>
      <div className="absolute left-0 right-0 top-1/4 -z-10 m-auto h-75 w-75 rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
      <div className="relative z-10 w-full max-w-lg">
       
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Register Your Workspace
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Set up your company details to start managing your inventory and store.
          </p>
        </div>

       
        <div className="bg-white p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200 rounded-2xl">
          <CompanyForm />
        </div>
        
      </div>
    </div>
  );
};

export default Page;
