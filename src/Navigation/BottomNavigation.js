import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoDark from "@/assets/images/logo-dark.jpg";
import { useRouter } from "next/router";
import { useState } from "react";
import SearchDrawerComponent from "@/component/SearchDrawerComponent";
import BlurFade from "@/components/ui/blur-fade";
import BuySellDrawer from "@/component/BuySellDrawer/BuySellDrawer";

export default function BottomNavigation() {
  const router = useRouter();

  const isActive = (href) => router.pathname === href;
  const [showDrawer, setShowDrawer] = useState(false);

  const searchDrawerFunction = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <div className="w-full mb-8">
      <section
        id="top-navigation"
        className="block fixed inset-x-0 top-0 z-10 bg-white shadow ms:px-6 ms:py-4"
      >
        <div className="fixed bottom-12 left-4 w-60 h-12 bg-headupb2b text-white shadow-lg flex items-center justify-center rounded-lg">
          <BuySellDrawer />
        </div>

        <div className="flex flex-row justify-around">
          <div className="flex justify-center">
            <Link href={"/"}>
              <Image src={LogoDark} height={15} className="inline-block" />
            </Link>
          </div>
          <Link
            href="/we-have-raised-funds"
            className="my-2 mx-4 text-[8px] rounded relative inline-block group overflow-hidden font-bold"
          >
            We have raised funds!{" "}
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-headupb2b transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          {/* <a
            href="https://artmilan.shop/"
            className="text-sm 4k:text-3xl rounded relative inline-block group overflow-hidden"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/Untitled-1.jpg"
              alt="Description of the image"
              className="w-32 h-10"
            />
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-headupb2b transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a> */}
        </div>
      </section>

      <section
        id="bottom-navigation"
        className="block fixed inset-x-0 bottom-0 z-10 bg-white"
      >
        <div id="tabs" className="flex justify-between">
          <Link
            href="/"
            className={`w-full focus:text-headupb2b hover:text-teal-500 justify-center inline-block text-center content-center pt-2 pb-1 ${
              isActive("/") ? "text-headupb2b" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 inline-block"
            >
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
            <span className="tab tab-home block text-xs">Home</span>
          </Link>
          <div
            className={`w-full focus:outline-none justify-center inline-block text-center content-center pt-2 pb-1`}
            onClick={searchDrawerFunction}
            style={{ userSelect: "none" }}
          >
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 inline-block">
                            <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                        </svg> */}
            <SearchDrawerComponent />
            <label
              className="block text-xs focus:outline-none"
              onClick={searchDrawerFunction}
            >
              Search
            </label>
          </div>

          <Link
            href="/blog"
            className={`w-full hover:text-teal-500 justify-center inline-block text-center content-center pt-2 pb-1`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 inline-block"
            >
              <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
            </svg>
            <span className="tab tab-explore block text-xs">Blog</span>
          </Link>
          <Link
            href="/about"
            className={`w-full focus:text-headupb2b hover:text-teal-500 justify-center inline-block text-center content-center pt-2 pb-1 ${
              isActive("/about") ? "text-headupb2b" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 inline-block"
            >
              <path
                fill-rule="evenodd"
                d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="tab tab-whishlist block text-xs">About us</span>
          </Link>
          <Link
            href="/contact"
            className={`w-full focus:text-headupb2b hover:text-teal-500 justify-center inline-block text-center content-center pt-2 pb-1 ${
              isActive("/contact") ? "text-headupb2b" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 inline-block"
            >
              <path
                fill-rule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="tab tab-account block text-xs">Contact us</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
