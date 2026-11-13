import { fetchProducts } from "@/lib/Api";
import SaleForm from "../../../components/SaleForm";

export const metadata = { title: "New Sale | CCK Retail" };

export default async function NewSalePage() {
  const data = await fetchProducts();
  const variants = data.flatMap((product) => product.variants);
  return (
    <div className="min-h-screen">
      <SaleForm variants={variants} />
    </div>
  );
}
