"use client";

import { useRef, useState } from "react";
import { Check, Edit2Icon, X} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { numberInputClass } from "./ui-patterns";
import { payment_action } from "@/lib/actions";
import DialogBox from "./Dialog";
import { PaymentMethods } from "@/lib/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PaymentToast } from "./PaymentToasts";

export default function EditableOrderTotal({
  initialAmount,
  orderId,
}: {
  initialAmount: string | number;
  orderId: string | number;
}) {
  const router = useRouter();
  const currentAmount = Number(initialAmount ?? 0);
  const [selectedAmount, setSelectedAmount] = useState<{ source: number; amount: number } | null>(null);
  const amountToPay = selectedAmount?.source === currentAmount ? selectedAmount.amount : currentAmount;
  const [draftAmount, setDraftAmount] = useState(String(currentAmount));
  const [isEditing, setIsEditing] = useState(false);
  
  
  const [uuid] = useState<string>(crypto.randomUUID());
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePayment = async (payload: { id: string | number, amount: number, method?: PaymentMethods }) => {
    try {
      if (Number(payload.amount) > Number(initialAmount)) {
         toast.error("overpayment not allowed")
         return
      }
      const res = await payment_action(payload, uuid);
      

      if (res.success) {
      toast.custom((t) => (
        <PaymentToast 
          t={t} 
          status="success" 
          message={res.message || "Processed securely."}
          amount={payload.amount}
          method="Card"
        />
      ));
      router.refresh();
    } else {
      toast.custom((t) => (
        <PaymentToast 
          t={t} 
          status="error" 
          message={res.error?.[0] || "Card declined or network issue."}
        />
      ));
    }
    } catch (error) {
      toast.error("Sorry an error occured!")
    }
  };

  const startEditing = () => {
    setDraftAmount(String(amountToPay));
    setIsEditing(true);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const confirmPayment = () => {
    setSelectedAmount({ source: currentAmount, amount: Number(draftAmount || 0) });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200/80 bg-white/60 p-4 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/60 shadow-xs transition-all">
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
        
        {!isEditing && (
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-xs font-medium text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 dark:text-indigo-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300 transition-colors"
            onClick={startEditing}
          >
            <Edit2Icon className="mr-1.5 size-3" />
            Edit Amount
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col sm:items-center gap-2 pt-1 animate-in fade-in-50 duration-200">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
              ₦
            </span>
            <input
              ref={inputRef}
              type="number"
              step="1"
              min={0}
              value={draftAmount}
              placeholder="0.00"
              onChange={(event) => setDraftAmount(event.target.value)}
              className={`${numberInputClass} w-full rounded-lg bg-white pl-7 pr-3 py-2 text-sm font-medium text-slate-900 placeholder-slate-400 border border-slate-300 shadow-xs transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100`}
              aria-label={`Payment amount for sale ${orderId}`}
            />
          </div>
          
          <div className="flex items-center gap-1.5 justify-end">
            <Button 
              className="h-9 bg-emerald-600 text-white hover:bg-emerald-700 px-3 text-xs font-semibold shadow-xs transition-colors dark:bg-emerald-600 dark:hover:bg-emerald-500"
              type="button" 
              size="sm" 
              onClick={confirmPayment} 
              aria-label="Confirm amount"
            >
              <Check className="mr-1 size-3.5" />
              Set
            </Button>
            <Button
              className="h-9 border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 px-3 text-xs font-semibold shadow-xs transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(false)}
              aria-label="Cancel edit"
            >
              <X className="mr-1 size-3.5" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {amountToPay < 0 ? "Refund amount:": "Payable amount:"}
            </span>
            <span className="font-mono text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {formatCurrency(Math.abs(amountToPay))}
            </span>
          </div>

            {Number(amountToPay) < 0 ? <Button className="text-white sm:px-1.5 px-3 font-semibold rounded-sm ml-2 text-center transition-all duration-200 delay-50 w-full bg-rose-400 hover:text-white hover:bg-rose-500 cursor-pointer" onClick={()=> handlePayment({id:orderId, amount:amountToPay, })}>Refund</Button> : (<div className="w-full pt-1">
            <DialogBox 
              id={orderId} 
              amount={amountToPay}
              onPay={handlePayment} 
            />
          </div>)}
          
        </div>
      )}
    </div>
  );
}
