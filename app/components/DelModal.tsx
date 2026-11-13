'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { del_variant_action } from "@/lib/actions";

const DelModal = ({ variantId }: { variantId: string | number }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setPending(true);
    setError("");
    const result = await del_variant_action(String(variantId));
    setPending(false);

    if (result?.success) {
      setOpen(false);
      router.refresh();
    } else {
      const detail = result?.error ?? result?.detail ?? "Unable to delete this item.";
      setError(typeof detail === "string" ? detail : Object.values(detail).flat().join(" "));
    }
  };

  return <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <button type="button" aria-label="Delete variant">
    <span className="inline-flex items-center gap-2  cursor-pointer">
                            <Trash2Icon className="size-4 ml-2 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors" />
                            </span>
    </button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    <div className="flex justify-end gap-2">
      <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={pending}>
        Cancel
      </Button>
      <Button type="button" variant="destructive" onClick={handleDelete} disabled={pending}>
        {pending ? "Deleting…" : "Delete"}
      </Button>
    </div>
  </DialogContent>
</Dialog>
};

export default DelModal;
