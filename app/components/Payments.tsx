import React from "react";
import { Payment, SalePaymentType } from "@/lib/types";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

export default async function AllSales({
  SalePayment,
  getPaymentStatusStyles,
}: {
  SalePayment: SalePaymentType;
  getPaymentStatusStyles: (status: string) => { badge: string; dot: string; label: string };
}) {
  const payments: Payment[] = SalePayment.payments || [];
  const refunds = SalePayment.refunds || [];
  const statusStyles = getPaymentStatusStyles(SalePayment.sale_status);

  const totalAmount = Number(SalePayment.total_amount) || 0;
  const totalPaid = Number(SalePayment.total_payment) || 0;
  const outstandingAmount = Number(SalePayment.outstanding_amount) || 0;
  const totalRefunded = refunds.reduce((acc, refund) => acc + (Number(refund.amount) || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 font-sans md:p-8 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl space-y-8">
        
        
        <div>
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Sale_Id: <span className="font-mono font-medium text-gray-900 dark:text-gray-300">{SalePayment.id}</span>
              </p>
            </div>
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold uppercase tracking-wider shadow-sm transition-transform hover:scale-105",
                statusStyles.badge
              )}
            >
              <span className={cn("h-2 w-2 rounded-full animate-pulse", statusStyles.dot)} />
              {statusStyles.label}
            </span>
          </div>

         
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Total Amount
              </p>
              <p className="mt-2 font-mono text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(totalAmount)}
              </p>
            </div>

            <div className="group rounded-2xl border border-emerald-100 bg-emerald-50/30 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md dark:border-emerald-900/30 dark:bg-emerald-900/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Total Paid
              </p>
              <p className="mt-2 font-mono text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                {formatCurrency(totalPaid)}
              </p>
            </div>

            <div className="group rounded-2xl border border-amber-100 bg-amber-50/30 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-md dark:border-amber-900/30 dark:bg-amber-900/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Total Refunded
              </p>
              <p className="mt-2 font-mono text-2xl font-bold text-amber-700 dark:text-amber-300">
                {formatCurrency(totalRefunded)}
              </p>
            </div>

            <div className="group rounded-2xl border border-rose-100 bg-rose-50/30 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-md dark:border-rose-900/30 dark:bg-rose-900/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Outstanding Balance
              </p>
              <p className="mt-2 font-mono text-2xl font-bold text-rose-700 dark:text-rose-300">
                {formatCurrency(outstandingAmount)}
              </p>
            </div>
          </div>
        </div>

        
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Payment History
            </h2>
          </div>

          {payments.length > 0 ? (
            <div className="space-y-6">
              {/* === MOBILE VIEW === */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {payments.map((payment: Payment) => {
                  const amount = Number(payment.amount_paid) || 0;

                  return (
                    <div key={payment.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            Payment_method: {payment.payment_method}
                          </span>
                          
                        </div>
                        <div className="text-right">
                          
                          <p className="font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(amount)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
                        <span className="text-sm font-medium text-gray-500">Date</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                          {formatDate(payment.created_at)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              
              <div className="hidden w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block dark:border-gray-800 dark:bg-gray-900">
                <table className="w-full table-fixed border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-400">
                      <th className="w-1/4 p-4 font-semibold">Transaction ID</th>
                      <th className="w-1/4 p-4 font-semibold">Method</th>
                      <th className="w-1/4 p-4 font-semibold">Date</th>
                      <th className="w-1/4 p-4 text-right font-semibold">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {payments.map((payment: Payment) => {
                      const amount = Number(payment.amount_paid) || 0;

                      return (
                        <tr key={payment.id} className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                          <td className="truncate p-4 font-mono font-medium text-gray-900 dark:text-gray-100">
                          {payment.id}
                          </td>
                          <td className="truncate p-4">
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                              {payment.payment_method}
                            </span>
                          </td>
                          <td className="truncate p-4 text-gray-600 dark:text-gray-400">
                            {formatDate(payment.created_at)}
                          </td>
                          <td className="truncate p-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(amount)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 py-16 text-center transition-colors dark:border-gray-800 dark:bg-gray-900/20">
              <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-800">
                <svg className="h-8 w-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">No payments yet</h3>
              <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
                There are currently no recorded payments for this sale.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}