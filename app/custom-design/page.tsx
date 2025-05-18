import CartModal from "components/cart/modal";
import CpCustomComponent from "components/custom-design/cp-custom-component";
import { CpNavbarHeader } from "components/layout/cp-navbar/cp-navbar-header";
import { ProductProvider } from "components/product/product-context";
import { getProduct } from "lib/shopify";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import styles from "./page.module.scss";

export default async function Home() {
  const product = await getProduct("custom-order");
  if (!product) return notFound();

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductProvider>
          <div className="absolute right-[32px] top-[48px]">
            <CartModal />
          </div>

          <CpNavbarHeader />
          <div className={styles["cp-container"]}>
            <div className={styles["cp-container__inner"]}>
              <CpCustomComponent product={product} />
            </div>
          </div>
        </ProductProvider>
      </Suspense>
    </>
  );
}
