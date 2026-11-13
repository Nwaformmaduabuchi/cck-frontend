'use client';

import {
  Trash2Icon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const DelModal = () => {
  return <Dialog>
  <DialogTrigger>
    <span className="inline-flex items-center gap-2  cursor-pointer">
                            <Trash2Icon className="size-4 ml-2 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors" />
                            </span>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
      <DialogDescription>
        This action cannot be undone
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
};

export default DelModal;
