import { CartProvider } from "components/cart/cart-context";
import { PosterProvider } from "components/custom-design/poster-context";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { ReactNode } from "react";
import "./styles/globals.scss";

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="en">
      <body>
        <CartProvider cartPromise={cart}>
          <PosterProvider>
            <main>{children}</main>
          </PosterProvider>
        </CartProvider>
      </body>
    </html>
  );
}
