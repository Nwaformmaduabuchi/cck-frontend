import RecentSalesActivity from "@/app/components/History"; // Adjust path if needed
import { Fetchhistory } from "@/lib/Api"; 
import { StockMovement } from "@/lib//types"; // Adjust path if needed

export default async function HistoryPage() {
  const response = await Fetchhistory();

  const historyData: StockMovement[] = "data" in response 
    ? (response.data as StockMovement[]) 
    : [];

  return (
    <RecentSalesActivity data={historyData} />
  );
}