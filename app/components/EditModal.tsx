'use client';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { VariantList } from "@/lib/types"
import { updateVariantOnServer } from "@/lib/Api"
import { Edit2Icon, PackageSearch, Loader2 } from "lucide-react"
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { StatusToast } from "./CustomerToasts";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";
const inputClass = "flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm transition-all focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:focus:border-sky-400 dark:focus:ring-sky-400/20";

export default function EditModal({ variant }: {variant: VariantList }) {
  const router = useRouter();
  
  const [editedVariant, setEditVariant] = useState<VariantList>(variant || {});
  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const updateVariant = (id: number | string, field: keyof VariantList, value: string | number) => {
    setEditVariant((prevVariant) => ({
      ...prevVariant,
      [field]: value,
    }));
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const res = await updateVariantOnServer(editedVariant);
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
      
      setIsOpen(false);
      router.refresh(); 
    } catch (error) {
      toast.error("Failed to update variant");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    // 6. Bind the open state to the Dialog
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button 
          type="button" 
          className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:border-sky-500/30 dark:hover:bg-sky-500/10 dark:hover:text-sky-400"
          aria-label="Edit variant"
        >
          <Edit2Icon className="size-4" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md md:max-w-lg overflow-hidden p-0 dark:border-slate-800">
        <form className="flex flex-col h-full bg-slate-50/30 dark:bg-slate-900/30">
          
          <div className="p-6 pb-4 border-b border-border bg-background">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl font-heading">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400">
                  <PackageSearch className="size-4" />
                </div>
                Make Changes
              </DialogTitle>
            </DialogHeader>
          </div>
          
          <div className="p-6 space-y-5">
            
            <div className="w-full">
              <label className={labelClass} htmlFor={`name-${variant.id}`}>
                Variant Name <span className="text-rose-500">*</span>
              </label>
              <input 
                id={`name-${variant.id}`} 
                name="name" 
                defaultValue={variant.name} 
                className={inputClass}
                placeholder="e.g. Default"
                onChange={(event) => updateVariant(variant.id, "name", event.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="w-full">
                <label className={labelClass} htmlFor={`color-${variant.id}`}>
                  Color <span className="text-rose-500">*</span>
                </label>
                <input 
                  id={`color-${variant.id}`} 
                  name="color" 
                  defaultValue={variant.color} 
                  className={inputClass}
                  placeholder="e.g. Midnight Blue"
                  onChange={(event) => updateVariant(variant.id, "color", event.target.value)}
                />
              </div>

              <div className="w-full">
                <label className={labelClass} htmlFor={`size-${variant.id}`}>
                  Size <span className="text-rose-500">*</span>
                </label>
                <input 
                  id={`size-${variant.id}`} 
                  name="size" 
                  defaultValue={variant.size} 
                  className={inputClass}
                  placeholder="e.g. XL"
                  onChange={(event) => updateVariant(variant.id, "size", event.target.value)}
                />
              </div>

              <div className="w-full">
                <label className={labelClass} htmlFor={`product_type-${variant.id}`}>
                  Type <span className="text-rose-500">*</span>
                </label>
                <input 
                  id={`product_type-${variant.id}`} 
                  name="product_type" 
                  defaultValue={variant.product_type} 
                  className={inputClass}
                  placeholder="e.g. Apparel"
                  onChange={(event) => updateVariant(variant.id, "product_type", event.target.value)}
                />
              </div>

              <div className="w-full">
                <label className={labelClass} htmlFor={`quantity-${variant.id}`}>
                  Qty <span className="text-rose-500">*</span>
                </label>
                <input 
                  id={`quantity-${variant.id}`}
                  type="number"
                  name="quantity" 
                  min={0}
                  defaultValue={variant.quantity === 0 ? "" : variant.quantity}
                  className={inputClass}
                  placeholder="1"
                  onChange={(event) => updateVariant(variant.id, "quantity", event.target.value)}
                />
              </div>

              <div className="w-full">
                <label className={labelClass} htmlFor={`price-${variant.id}`}>
                  Price <span className="text-rose-500">*</span>
                </label>
                <input 
                  id={`price-${variant.id}`}
                  type="number"
                  name="price" 
                  min={0}
                  defaultValue={variant.price === 0 ? "" : variant.price}
                  className={inputClass}
                  placeholder="1"
                  onChange={(event) => updateVariant(variant.id, "price", event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="p-6 pt-0 mt-auto">
            <DialogFooter className="gap-2 sm:space-x-0">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="w-full sm:w-auto" disabled={isSaving}>
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                type="submit" 
                onClick={handleUpdate} 
                disabled={isSaving}
                className="w-full sm:w-auto bg-sky-600 text-white hover:bg-sky-500 dark:bg-sky-600 dark:hover:bg-sky-500 transition-colors shadow-sm disabled:opacity-70"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  )
}