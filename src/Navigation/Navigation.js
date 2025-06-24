import React, { useEffect, useState } from "react";
import LogoDark from "@/assets/images/logo-dark.jpg";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import CustomSearch from "@/component/Form/Search/CustomSearch";
import { useRouter } from "next/router";
import WordRotate from "@/components/magicui/word-rotate";
import BlurFade from "@/components/ui/blur-fade";
import WordRotateComp from "@/component/Header/WordRotateComp";
const hoverClass = `relative text-black cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]`;

export default function Navigation() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleAnimation = () => {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("opened");
    menu.setAttribute("aria-expanded", menu.classList.contains("opened"));
    setIsOpen(!isOpen);
  };

  return (
    <header className="mm:px-6 sm:flex sm:justify-between sm:items-center py-6 l:px-6 ll:px-28 imac:px-44 4k:px-56">
      <div className="flex justify-between w-full items-center 4k:p-10">
        {router.pathname === "/" && (
          <div className="flex flex-row">
            <span className="text-md font-bold mt-2 text-black/80 dark:text-white">{`Delivered ${" "}`}</span>
            <WordRotateComp />
          </div>
        )}

        {router.pathname !== "/" && (
          <>
            <div className="t:w-[23%] l:w-[33.33%] ll:w-[20%]">
              <div className="l:col-span-1 flex justify-between">
                <Link href={"/"}>
                  <Image src={LogoDark} className="w-[150px] 4k:w-[350px]" />
                </Link>
                <div className="sm:hidden">
                  <button
                    className="menu"
                    onClick={handleAnimation}
                    aria-label="Main Menu"
                  >
                    <svg width="30" height="30" viewBox="0 0 100 100">
                      <path
                        className="line line1"
                        d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                      />
                      <path className="line line2" d="M 20,50 H 80" />
                      <path
                        className="line line3"
                        d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="t:w-[33.33%] l:w-[90.33%] ll:w-[52%]">
              <CustomSearch />
            </div>
          </>
        )}

        <div className="flex justify-end t:w-8/12 ll:w-8/12 4k:w-full">
          <nav
            className={` flex flex-row justify-end bg-slate-200 t:bg-white ${
              isOpen ? "block" : "hidden"
            } t:block`}
          >
            <a
              href="/we-have-raised-funds"
              className="my-2 mx-3 text-xs 4k:text-3xl rounded relative inline-block group overflow-hidden font-bold"
            >
              We have raised funds!{" "}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-headupb2b transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
            <a
              href="/careers"
              className="my-2 mx-3 text-xs 4k:text-3xl font-medium rounded relative inline-block group overflow-hidden"
            >
              Careers{" "}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-headupb2b transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
            <a
              href="/contact"
              className="my-2 mx-3 text-xs 4k:text-3xl font-medium rounded relative inline-block group overflow-hidden"
            >
              Contact us{" "}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-headupb2b transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>

            <a
              href="/ads-with-us"
              className="my-2 mx-3 text-xs 4k:text-3xl font-medium rounded relative inline-block group overflow-hidden"
            >
              Advertise with us{" "}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-headupb2b transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
            <a
              href="/blog"
              className="my-2 mx-4 text-xs 4k:text-3xl font-medium rounded relative inline-block group overflow-hidden"
            >
              Blog{" "}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-headupb2b transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
            

            {/* <a
              href="https://artmilan.shop/"
              className="text-sm 4k:text-3xl rounded relative inline-block group overflow-hidden"
              target="_blank"
              rel="noopener noreferrer"
            >
            
              <img
                src="/images/Untitled-1.jpg"
                alt="Description of the image"
                className="w-full h-auto" 
              />
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-headupb2b transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
