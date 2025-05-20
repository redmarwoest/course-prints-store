import { Navbar } from "components/layout/cp-navbar/cp-navbar";
import { CpNavbarHeader } from "components/layout/cp-navbar/cp-navbar-header";
import { getCollection, getCollectionProducts } from "lib/shopify";

// Mark this page as dynamic
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default async function Home() {
  try {
    const [collection, products] = await Promise.all([
      getCollection("hidden-homepage-carousel"),
      getCollectionProducts({
        collection: "hidden-homepage-carousel",
      }),
    ]);

    if (!collection) {
      return <div>Collection not found</div>;
    }

    return (
      <>
        <CpNavbarHeader />
        <Navbar />
        <div className="mx-auto max-w-(--breakpoint-2xl) px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Our Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="font-bold">
                  Price: {product.priceRange.minVariantPrice.amount}{" "}
                  {product.priceRange.minVariantPrice.currencyCode}
                </p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error in products page:", error);
    return (
      <>
        <CpNavbarHeader />
        <Navbar />
        <div className="mx-auto max-w-(--breakpoint-2xl) px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Our Products</h1>
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold mb-2">
              Products are currently unavailable
            </h2>
            <p className="text-gray-600">Please try again later</p>
          </div>
        </div>
      </>
    );
  }
}
