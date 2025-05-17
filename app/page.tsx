import SectionCustom from "components/cp-section-custom";
import SectionHero from "components/cp-section-hero";
import { getCollection, getCollectionProducts } from "lib/shopify";

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default async function Home() {
  const collection = await getCollection("hidden-homepage-carousel");
  const products = await getCollectionProducts({
    collection: "hidden-homepage-carousel",
  });

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <div>
      <SectionHero />
      <SectionCustom />
      {/* <h1 className="text-2xl font-bold mb-4">{collection.title}</h1>
      <p className="mb-8">{collection.description}</p>
    <Carousel />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="font-bold">
              Price: {product.priceRange.minVariantPrice.amount}{" "}
              {product.priceRange.minVariantPrice.currencyCode}
            </p>
          </div>
        ))}
      </div> */}
    </div>
  );
}
