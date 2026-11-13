"use client";

import { useMemo, useState, useEffect } from "react";
import { RotateCcw, Save, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SaleOrderItem } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";
import { labelClass, numberInputClass, StatusPill } from "./ui-patterns";
import { del_sale_action, patchAction } from "@/lib/actions";
import Alert from "./Alert";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { StatusToast } from "./CustomerToasts";

export default function EditableSaleItem({ item, success, error }: { item: SaleOrderItem, success: boolean, error: string[] }) {
  const router = useRouter();
  
  const [quantity, setQuantity] = useState(Number(item.quantity ?? 0));
  const [unitPrice, setUnitPrice] = useState(Number(item.unit_price ?? 0));
  const [baseline, setBaseline] = useState({
    quantity: Number(item.quantity ?? 0),
    unitPrice: Number(item.unit_price ?? 0),
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  if(!success){
     toast.error(error, {
              position: "top-center",
              classNames: {
                content: "text-sm font-semibold w-full text-white border-none shadow-sm rounded-lg p-2",
              },
            });
  }
  
  useEffect(() => {
    setQuantity(Number(item.quantity ?? 0));
    setUnitPrice(Number(item.unit_price ?? 0));
    setBaseline({
      quantity: Number(item.quantity ?? 0),
      unitPrice: Number(item.unit_price ?? 0),
    });
  }, [item.quantity, item.unit_price]);

  const lineTotal = useMemo(() => quantity * unitPrice, [quantity, unitPrice]);
  const dirty = quantity !== baseline.quantity || unitPrice !== baseline.unitPrice;

  const handleCancel = () => {
    setQuantity(baseline.quantity);
    setUnitPrice(baseline.unitPrice);
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      const payload = { 
        id: item.id, 
        quantity: quantity, 
        unit_price: unitPrice 
      };
      
      const res = await patchAction(item.id, payload);
      if (res) {
        setBaseline({ quantity, unitPrice });
        
        if (res.success) {
             toast.custom((t) => (
               <StatusToast
                 t={t} 
                 status="success" 
                 title="Success" 
                 message={res.message} 
               />
             ));
           } else {
             
             toast.custom((t) => (
               <StatusToast 
                 t={t} 
                 status="error" 
                 title="Failed" 
                 errorPayload={res.error} 
               />
             ));
           }
         router.refresh();
      }

    } catch (error) {
           toast.custom((t) => (
               <StatusToast 
                 t={t} 
                 status="error" 
                 title="Update Failed" 
                 errorPayload={error} 
               />
             ));
           }
   finally {
      setIsSaving(false);
    }
  };

  const handleDel = async (id: string) => {
    try {
       const res = await del_sale_action(id);
      if (res.success) {
             toast.custom((t) => (
               <StatusToast
                 t={t} 
                 status="success" 
                 title="Variant Updated" 
                 message={res.message} 
               />
             ));
           } else {
             
             toast.custom((t) => (
               <StatusToast 
                 t={t} 
                 status="error" 
                 title="Update Failed" 
                 errorPayload={res.error} 
               />
             ));
           }
      router.refresh();
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  return (
    <div className={cn(
      "rounded-lg border bg-card p-1.5 shadow-sm relative", 
      item.item_status === "completed" ? "group rounded-xl border p-5 shadow-sm transition-all duration-300 bg-green-50/20 dark:border-green-900/30 dark:bg-green-900/10 border-green-700 shadow-green-600" : ""
    )}>
      <div>
        <CheckCircle className={cn(
          "absolute -right-2 -top-2 border-none size-4", 
          item.item_status === "completed" ? "text-white rounded-full bg-emerald-500" : "hidden"
        )} />
      </div>
      
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground">
            {`${item.variant_name} - ${item.product_name}`}
          </h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {item.product_type && <StatusPill>{item.product_type}</StatusPill>}
            {item.variant_color && <StatusPill>{item.variant_color}</StatusPill>}
            {item.variant_size && <StatusPill>{item.variant_size}</StatusPill>}
          </div>
        </div>
        <div>
          <span className="font-heading text-base font-semibold flex flex-col gap-1">
            {formatCurrency(lineTotal)}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 border-t border-border pt-4 sm:grid-cols-[120px_160px_1fr]">
        <div>
          <label className={labelClass} htmlFor={`qty-${item.id}`}>
            Quantity
          </label>
          <input
            id={`qty-${item.id}`}
            type="number"
            min={0}
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
            className={numberInputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={`price-${item.id}`}>
            Unit price
          </label>
          
          <input
            id={`price-${item.id}`}
            type="number"
            min={0}
            step="0.01"
            value={unitPrice}
            onChange={(event) => setUnitPrice(Number(event.target.value))}
            className={numberInputClass}
          />
        </div>

        <div className="flex items-end justify-start gap-2 sm:justify-end">
          <Button type="button" variant="outline" disabled={!dirty || isSaving} onClick={handleCancel}>
            <RotateCcw className="size-4" />
          </Button>
          
          <Button type="button" disabled={!dirty || isSaving} onClick={handleUpdate}>
            <Save className="size-4" />
          </Button>
          
         
          <div className="inline-flex h-10 items-center justify-center rounded-md bg-red-100 text-red-500 hover:bg-red-300 hover:text-red-700 px-4 py-2 transition-colors">
            <Alert status={item?.item_status} id={item.id} handleDel={handleDel} />
          </div>
        </div>
      </div>
    </div>
  );
}