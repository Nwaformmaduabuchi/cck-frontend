"use client"
import { Button } from "@/components/ui/button";
import { get_receipt } from "@/lib/actions";
import { useState } from "react";
import { toast } from "sonner";
import { StatusToast } from "./CustomerToasts";

const ReceiptDownloadButton = ({sale_id}:{sale_id:string}) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handle_Download = async()=>{
        setIsDownloading(true);

        try {
            const res = await get_receipt(sale_id, crypto.randomUUID());
            if (!res.success) {
              toast.custom((t) => (
                <StatusToast
                  t={t}
                  status="error"
                  title="Failed to download receipt"
                  errorPayload={res.error}
                />
              ));
              return;
            }

            toast.custom((t) => (
              <StatusToast
                t={t}
                status="success"
                title="Receipt ready"
                message={res.message}
              />
            ));

            const bytes = Uint8Array.from(atob(res.data), (char) => char.charCodeAt(0));
            const blobData = new Blob([bytes], { type: res.contentType });
            const url = window.URL.createObjectURL(blobData);
            const element = document.createElement('a');
            element.href = url;
            element.download = res.filename;
      
            document.body.appendChild(element);
            element.click();
            element.remove();
            
            window.setTimeout(() => window.URL.revokeObjectURL(url), 1000);
        } catch {
            
        } finally {
            setIsDownloading(false);
        }
    }
  return <Button onClick={handle_Download} disabled={isDownloading}>{isDownloading ? "Downloading..." : "Download Receipt"}</Button>;
};

export default ReceiptDownloadButton;
