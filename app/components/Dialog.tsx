'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Banknote,
  CreditCard,
  ArrowRightLeft,
  CircleEllipsis,
} from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { PaymentPayload, PaymentMethods } from "@/lib/types";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { StatusToast } from "./CustomerToasts";

const payment_methods = [
  { value: "cash", label: "Cash", icon: Banknote },
  { value: "debit_card", label: "Card", icon: CreditCard },
  { value: "transfer", label: "Transfer", icon: ArrowRightLeft },
  { value: "other", label: "Other", icon: CircleEllipsis },
];

const DialogBox = ({ id, amount, onPay }: PaymentPayload) => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(PaymentMethods.Cash);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      
     const res =   await onPay({
        id,
        amount,
        method: paymentMethod,
      });

      setOpen(false);

      startTransition(() => {
        router.refresh();
      });

    } catch (error) {
      console.error("Payment failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(
    "text-white sm:px-1.5 px-3 font-semibold rounded-sm ml-2 text-center transition-all duration-200 delay-50 w-full hover:bg-green-500 bg-green-400"
  )}>
        Pay
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-semibold">Payment Method</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-2 font-medium">
          {payment_methods.map(({ value, label, icon: Icon }) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-4 rounded-lg px-3 py-3 hover:bg-accent has-checked:bg-accent"
            >
              <Icon className="size-6 text-primary" />
              <span>{label}</span>
              <input
                type="radio"
                name="payment_method"
                value={value}
                checked={paymentMethod === value}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethods)}
                className="ml-auto"
              />
            </label>
          ))}
        </div>
        
        <DialogFooter className="border-none bg-transparent">
          <DialogClose asChild>
            <Button variant="destructive" type="button" disabled={loading}>
              Close
            </Button>
          </DialogClose>
          
          {/* Changed type="submit" to type="button" to prevent native form submission bugs */}
          <Button 
            type="button" 
            disabled={loading || isPending} 
            className="px-2 py-1.5 text-white bg-green-400 hover:bg-green-500 font-semibold tracking-wide" 
            onClick={handlePayment}
          >
            {loading || isPending ? "Processing..." : "Complete Payment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;