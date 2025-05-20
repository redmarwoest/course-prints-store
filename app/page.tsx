import { Navbar } from "components/layout/cp-navbar/cp-navbar";
import ReviewMarquee from "components/layout/cp-review-marquee";
import SectionCarousel from "components/sections/cp-section-carousel";
import SectionCustom from "components/sections/cp-section-custom";
import SectionHero from "components/sections/cp-section-hero";
import SectionTwoColumns from "components/sections/cp-section-two-columns";
import { getCollection, getCollectionProducts } from "lib/shopify";
import Link from "next/link";

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
        <ReviewMarquee />
        <Navbar />
        <div>
          <SectionHero />
          <SectionCustom />
          <SectionCarousel />
          <SectionTwoColumns />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.handle}`}>
                <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="font-bold">
                  Price: {product.priceRange.minVariantPrice.amount}{" "}
                  {product.priceRange.minVariantPrice.currencyCode}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error in home page:", error);
    // Return a fallback UI instead of throwing
    return (
      <>
        <ReviewMarquee />
        <Navbar />
        <div>
          <SectionHero />
          <SectionCustom />
          <SectionCarousel />
          <SectionTwoColumns />
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
