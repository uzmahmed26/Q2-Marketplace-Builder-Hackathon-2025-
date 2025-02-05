"use client";

import { useEffect, useState } from "react";
import Card from "./ProductCart";
import { client } from "@/sanity/lib/client";
import { Product } from "../../../interface";

interface Props {
  Heading: string;
}

const NewCeramic = (props: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product" && category->name == 'decoration-items']{
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

        const fetchedProducts: Product[] = await client.fetch(query);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Error fetching products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen"> 
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-b from-gray-50 to-blue-100 py-10 px-6 rounded-xl shadow-md">
      <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        {props.Heading}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product: Product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow">
            <Card product={product} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default NewCeramic;
