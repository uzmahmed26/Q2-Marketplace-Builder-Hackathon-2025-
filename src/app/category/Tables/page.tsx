import ProductGrid from "@/app/components/ProductGrid";
import { client } from "@/sanity/lib/client";
import { Product } from "../../../../interface";

export default async function TablesPage() {
  try {
    const query = `*[_type == "product" && category->name == 'tables']{
      name,
      tags,
      price,
      stock,
      dimensions,
      id,
      description,
      discount,
      originalPrice,
      "categoryName": category->name,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      rating 
    }`;

    const products: Product[] = await client.fetch(query);

    return (
      <div className="bg-white min-h-screen">
        {/* Page Header */}
        <header className="bg-gray-800 py-6">
          <h1 className="text-3xl text-center text-white font-bold">
            Tables Collection
          </h1>
        </header>

        {/* Product Grid */}
        <main className="container mx-auto py-8 px-4">
          <ProductGrid products={products} title="" />
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-600 text-lg font-medium">
          Unable to load products. Please try again later.
        </p>
      </div>
    );
  }
}
