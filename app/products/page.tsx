import { Navbar } from "components/layout/cp-navbar/cp-navbar";
import { CpNavbarHeader } from "components/layout/cp-navbar/cp-navbar-header";
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
    <>
      <CpNavbarHeader />
      <Navbar />
      <div></div>
    </>
  );
}
