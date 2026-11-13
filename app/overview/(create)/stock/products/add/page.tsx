import AddProductForm from "@/app/components/AddProductForm";
import { fetchProducts } from "@/lib/Api";


const page = async() => {
 const products = await fetchProducts()
  return <div className= "min-h-screen">
    <AddProductForm products={products}/>
  </div>;
};

export default page;
