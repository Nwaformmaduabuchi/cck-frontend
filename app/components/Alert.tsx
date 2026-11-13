'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const Alert = ({status, id, handleDel}:{status:string | undefined ,id:string, handleDel:(id:string) => void}) => {
    
  return <AlertDialog>
  <AlertDialogTrigger asChild>
    {status !== "pending" ? (
      <Button variant={"destructive"}>Return</Button>
    ) :(
      <Button variant={"destructive"}><Trash2 className="size-4 text-red-500" /></Button>
    )}
    
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="text-red-500">Sure you want to delete ?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete this item.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={()=>handleDel(id)} >
        Confirm
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>;
};

export default Alert;
