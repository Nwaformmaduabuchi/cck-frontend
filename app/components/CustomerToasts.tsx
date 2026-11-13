import { toast } from "sonner";
import { 
  CheckCircle2, 
  XCircle, 
  X, 
  CreditCard, 
  ReceiptText, 
  Wallet
} from "lucide-react";

interface RegularToastProps {
  t: string | number; 
  status: "success" | "error";
  title?: string;
  message?: string;
  errorPayload?: any; 
}

export const StatusToast = ({ t, status, title, message, errorPayload }: RegularToastProps) => {
  const isSuccess = status === "success";

  const renderErrors = () => {
    if (!errorPayload) return null;

    if (Array.isArray(errorPayload)) {
      return errorPayload.map((err, i) => <li key={i}>{err}</li>);
    }
    
    if (typeof errorPayload === "object") {
      if (errorPayload.detail) {
        return <li>{errorPayload.detail}</li>;
      }
      return Object.entries(errorPayload).map(([field, msgs]: [string, any], i) => {
        const msg = Array.isArray(msgs) ? msgs[0] : msgs;
        if (field === "non_field_errors") return <li key={i}>{msg}</li>;
        return <li key={i}><span className="capitalize font-semibold">{field.replace('_', ' ')}:</span> {msg}</li>;
      });
    }
    
    return <li>{String(errorPayload)}</li>;
  };

  return (
    <div className="flex w-89 relative overflow-hidden bg-white rounded-xl shadow-xl border border-slate-100 p-4 gap-3">
      
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isSuccess ? 'bg-[#006c4a]' : 'bg-[#ba1a1a]'}`} />
      
      
      <div className="shrink-0 mt-0.5">
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-[#006c4a]" />
        ) : (
          <XCircle className="w-5 h-5 text-[#ba1a1a]" />
        )}
      </div>

      
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-slate-900">
          {title || (isSuccess ? "Success" : "Error")}
        </h3>
        
        {message && (
          <p className="mt-1 text-sm text-slate-500">{message}</p>
        )}
        
        {errorPayload && (
          <ul className="mt-1.5 text-sm text-slate-600 list-disc list-inside space-y-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
            {renderErrors()}
          </ul>
        )}
      </div>

      
      <button 
        onClick={() => toast.dismiss(t)} 
        className="shrink-0 p-1 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
