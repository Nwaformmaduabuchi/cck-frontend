"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  ArrowDown, 
  ArrowUp,
  Tags, 
  Download, 
  Calendar, 
  Clock, 
  Package,
  ShoppingCart,
  CreditCard,
  RotateCcw,
  Sliders,
  Trash2,
  X,
  Activity,
  Filter,
  FileText
} from "lucide-react";
import { StockMovement } from "@/lib/types";


function groupByDate(records: StockMovement[]) {
  return records.reduce((groups: Record<string, StockMovement[]>, record) => {
    const date = new Date(record.created_at).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
    if (!groups[date]) groups[date] = [];
    groups[date].push(record);
    return groups;
  }, {});
}


const getMovementConfig = (type: string, qty: number | null) => {
  const t = String(type).toLowerCase();
  if (t.includes("sale")) return { icon: ShoppingCart, bg: "bg-[#fff0ee]", text: "text-[#ba1a1a]" };
  if (t.includes("payment")) return { icon: CreditCard, bg: "bg-[#f0fcf6]", text: "text-[#006c4a]" };
  if (t.includes("refund")) return { icon: RotateCcw, bg: "bg-[#fff0ee]", text: "text-[#ba1a1a]" };
  if (t.includes("receive")) return { icon: ArrowUp, bg: "bg-[#f0fcf6]", text: "text-[#006c4a]" };
  if (t.includes("remove") || t.includes("cancel")) return { icon: Trash2, bg: "bg-[#fff0ee]", text: "text-[#ba1a1a]" };
  if (t.includes("update") || t.includes("adjustment")) return { icon: Sliders, bg: "bg-[#f0f4ff]", text: "text-[#1f108e]" };
  
  if (qty !== null && qty < 0) return { icon: ArrowDown, bg: "bg-[#fff0ee]", text: "text-[#ba1a1a]" };
  return { icon: Package, bg: "bg-[#f0f4ff]", text: "text-[#1f108e]" };
};

export default function RecentSalesActivity({ data = [] }: { data: StockMovement[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Calculate Metrics
  const totalTransactions = data.length;
  const stockInbound = data.reduce((sum, item) => item.quantity_change > 0 ? sum + item.quantity_change : sum, 0);
  const stockOutbound = data.reduce((sum, item) => item.quantity_change < 0 ? sum + Math.abs(item.quantity_change) : sum, 0);
  
  // Extract unique movement types for the filter pills
  const movementTypes = useMemo(() => {
    const types = new Set(data.map(item => String(item.movement_type).toLowerCase()));
    return ["all", ...Array.from(types)].slice(0, 6); 
  }, [data]);

  // Filter Data safely using your strict types
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const productName = item.variant?.product?.name || "";
      const variantDetails = `${item.variant?.color || ""} ${item.variant?.size || ""}`;
      
      const searchStr = `${item.id} ${item.movement_type} ${item.note || ""} ${productName} ${variantDetails}`.toLowerCase();
      const matchesSearch = !searchQuery || searchStr.includes(searchQuery.toLowerCase());
      const matchesCat = activeCategory === "all" || String(item.movement_type).toLowerCase() === activeCategory;
      
      return matchesSearch && matchesCat;
    });
  }, [data, searchQuery, activeCategory]);

  const groupedData = groupByDate(filteredData);

  return (
    <div className="min-h-screen bg-[#f8f9ff] font-sans text-[#0b1c30] antialiased pb-24 w-full">
      <main className="flex flex-col relative w-full pt-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xl font-medium">
          History
        </div>

        
        <section className="pt-4 space-y-8">
          {Object.entries(groupedData).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-dashed border-[#c8c4d5]">
              <div className="w-20 h-20 rounded-full bg-[#f0f4ff] flex items-center justify-center text-[#1f108e] mb-5 shadow-inner">
                <Search className="w-10 h-10 opacity-50" />
              </div>
              <h4 className="text-xl text-[#0b1c30] font-bold">No transactions found</h4>
              <button 
                onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                className="mt-6 px-6 py-2.5 bg-[#1f108e] text-white rounded-xl text-sm font-semibold shadow-md shadow-[#1f108e]/20 hover:bg-[#150a6b] transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            Object.entries(groupedData).map(([date, records]) => (
              <div key={date} className="relative">
                {/* Date Header */}
                <div className="sticky top-21 z-30 py-2 bg-[#f8f9ff]/95 backdrop-blur-md flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#c8c4d5]/40 shadow-sm">
                    <Calendar className="w-4 h-4 text-[#1f108e]" />
                    <span className="text-sm font-bold text-[#0b1c30]">{date}</span>
                  </div>
                  <div className="flex-1 h-px bg-linear-to-r from-[#c8c4d5]/40 to-transparent"></div>
                </div>

                {/* Transaction Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {records.map((record) => {
                    const { icon: Icon, bg, text } = getMovementConfig(String(record.movement_type), record.quantity_change);
                    const isOutbound = record.quantity_change < 0;
                    
                    const timeString = record.created_at.includes('T') 
                      ? record.created_at.split('T')[1].split('.')[0] 
                      : "00:00:00";
                    
                    // Safely extract variant details
                    const productName = record.variant?.product?.name;
                    const variantTags = [record.variant?.color, record.variant?.size].filter(Boolean).join(" ");
                    
                    return (
                      <article 
                        key={record.created_at + record.id} 
                        className="bg-white rounded-2xl p-5 shadow-sm border border-[#c8c4d5]/30 hover:border-[#1f108e]/30 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 min-w-0">
                            {/* Icon Box */}
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${bg} ${text}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            
                            {/* Primary Info */}
                            <div className="min-w-0 pt-0.5">
                              <h3 className="text-[14px] font-bold text-[#0b1c30] leading-tight group-hover:text-[#1f108e]">
                                {record.note || String(record.movement_type)}
                              </h3>
                              
                              {productName && (
                                <p className="text-sm text-[#464553] truncate mt-1">
                                  {productName}
                                </p>
                              )}
                              
                              <div className="flex flex-wrap items-center gap-2 mt-2.5">
                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#f8f9ff] border border-[#c8c4d5]/40 text-[#464553] text-[10px] font-bold tracking-wider uppercase font-mono">
                                  #{record.id}
                                </span>
                                
                                {variantTags && (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#1f108e]/5 text-[#1f108e] text-[11px] font-semibold truncate max-w-37.5">
                                    <Tags className="w-3 h-3 shrink-0" />
                                    <span className="truncate">{variantTags}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Right Aligned Data (Quantity Change) */}
                          <div className="flex flex-col items-end shrink-0">
                            {record.quantity_change !== null && record.quantity_change !== 0 ? (
                              <>
                                <span className={`px-2.5 py-1 rounded-lg font-mono text-[15px] tracking-tight font-bold border ${
                                  isOutbound 
                                    ? 'bg-[#fff0ee] text-[#ba1a1a] border-[#ffdad6]' 
                                    : 'bg-[#f0fcf6] text-[#006c4a] border-[#bdf1db]'
                                }`}>
                                  {Math.abs(record.quantity_change)}
                                </span>
                                <span className={`text-[10px] font-bold uppercase tracking-wide mt-2 ${
                                  isOutbound ? 'text-[#ba1a1a]/80' : 'text-[#006c4a]/80'
                                }`}>
                                  Qty
                                </span>
                              </>
                            ) : (
                               <span className="px-2.5 py-1 rounded-lg text-[12px] font-bold uppercase bg-[#f8f9ff] border border-[#c8c4d5]/40 text-[#464553]">
                                 Log
                               </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Footer / Timestamp */}
                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#f0f4ff] text-[#464553]">
                          <div className="flex items-center gap-1.5 text-[#464553]/80">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="text-xs font-semibold font-mono tracking-tight">
                              {timeString}
                            </span>
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest text-[#1f108e]/50 group-hover:text-[#1f108e]">
                            {String(record.movement_type)}
                          </span>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}