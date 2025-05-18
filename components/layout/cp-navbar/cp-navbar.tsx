"use client";

import CartModal from "components/cart/modal";
import LogoIcon from "components/icons/logo";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import MobileMenu from "./mobile-menu";

const { SITE_NAME } = process.env;

const defaultMenu: Menu[] = [
  { title: "About us", path: "/about-us" },
  { title: "All products", path: "/products" },
  { title: "Custom design", path: "/custom-design" },
];

export function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShow(true);
      } else if (window.scrollY > lastScrollY) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-transform duration-300 bg-white ${
        show ? "translate-y-0" : "-translate-y-full"
      } flex items-center justify-between p-4 lg:px-6`}
    >
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={defaultMenu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="hidden md:flex md:w-1/3">
          {defaultMenu.length && defaultMenu[0] ? (
            <ul className="gap-6 text-sm flex items-center">
              <li key={defaultMenu[0].title}>
                <Link
                  href={defaultMenu[0].path}
                  prefetch={true}
                  className="cp-link__standard"
                >
                  {defaultMenu[0].title}
                </Link>
              </li>
            </ul>
          ) : null}
        </div>
        <div className="flex-1 flex justify-center md:w-1/3">
          <Link
            href="/"
            prefetch={true}
            className="flex items-center justify-center"
          >
            <LogoIcon style={{ width: "72px", height: "48px" }} />
          </Link>
        </div>
        <div className="flex justify-end md:w-1/3">
          {defaultMenu.length > 1 && (
            <ul className="hidden gap-8 text-sm md:flex md:items-center mr-4">
              {defaultMenu.slice(1).map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="cp-link__standard"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="ml-4">
            <CartModal />
          </div>
        </div>
      </div>
    </nav>
  );
}
