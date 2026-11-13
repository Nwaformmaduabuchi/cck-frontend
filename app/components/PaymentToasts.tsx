import { formatCurrency } from "@/lib/utils";
import { CheckCircle2, CreditCard, ReceiptText, Wallet, X, XCircle } from "lucide-react";
import { toast } from "sonner";

interface PaymentToastProps {
  t: string | number;
  status: "success" | "error";
  message: string;
  amount?: number | string;
  method?: string; 
}

export const PaymentToast = ({ t, status, message, amount, method }: PaymentToastProps) => {
  const isSuccess = status === "success";

  return (
    <div className="flex flex-col w-89 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
      
      
      <div className={`p-4 flex items-start justify-between gap-3 ${isSuccess ? 'bg-[#f0fcf6]' : 'bg-[#fff0ee]'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isSuccess ? 'bg-[#006c4a]/10 text-[#006c4a]' : 'bg-[#ba1a1a]/10 text-[#ba1a1a]'}`}>
            {isSuccess ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          </div>
          <div>
            <p className="text-xs font-medium mt-0.5 text-slate-600">
              {message}
            </p>
          </div>
        </div>
        <button onClick={() => toast.dismiss(t)} className="text-slate-400 hover:text-slate-900">
          <X className="w-4 h-4" />
        </button>
      </div>

      
      {amount && (
        <div className="px-4 py-3 bg-white flex items-center justify-between border-t border-slate-100 border-dashed">
          <div className="flex items-center gap-2 text-slate-500">
            {method?.toLowerCase() === "cash" ? (
              <Wallet className="w-4 h-4" />
            ) : method?.toLowerCase() === "card" ? (
              <CreditCard className="w-4 h-4" />
            ) : (
              <ReceiptText className="w-4 h-4" />
            )}
            <span className="text-xs font-semibold uppercase tracking-wider">
              {method || "Amount"}
            </span>
          </div>
          
          <div className="text-lg font-bold text-slate-900 tracking-tight">
            {formatCurrency(amount)}
          </div>
        </div>
      )}
    </div>
  );
};