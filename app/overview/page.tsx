
import { fetchProducts } from "@/lib/Api"
import ProductLists from "./../components/ProductLists"

export default async function Page() {
  const products = await fetchProducts()
  return (
    <main className="min-h-dvh bg-background">
      <ProductLists products={products} />

    </main>
  )
}

