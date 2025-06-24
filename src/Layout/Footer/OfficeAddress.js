import Image from "next/image";
import React from "react";
import LogoWhite from "@/assets/images/logo-light.png";
import Link from "next/link";
import { CiLocationOn, CiPhone } from "react-icons/ci";
import { MdOutlineMarkEmailRead } from "react-icons/md";

export default function OfficeAddress({ hideLogo = false }) {
  return (
    <div>
      {/* <div className="ms:hidden l:block">
        <Image
          src={LogoWhite}
          height={30}
          className="4k:w-[350px]"
          alt="HEADSUP B2B"
        />
      </div> */}

      <div className={hideLogo ? "" : "mt-12"}>
        <div className="">
          <label className="text-xl font-semibold tracking-wide 4k:text-4xl">
            {" "}
            Contact Us{" "}
          </label>
        </div>
        <div className="flex flex-row my-1 mt-2 ">
          <div className="h-10 mr-2">
            <CiLocationOn />
          </div>
          <label className="text-xs tracking-wide 4k:text-2xl">
            2nd floor A4, Aurobindo Marg, Sarvodaya Enclave, New Delhi 110017
          </label>
        </div>
        <div>
          <Link
            href={`tel:+91 72101 99772`}
            class="flex flex-row w-fit font-normal text-xs leading-5 cursor-pointer relative group 4k:text-2xl"
          >
            <div className="mt-1 mr-2">
              <CiPhone />
            </div>
            Rizwan - +91 72101 99772
            <span class="absolute inset-x-0 bottom-0 h-[0.2px] bg-white transform scale-x-0  group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
        </div>

        <div>
          <Link
            href={`tel:+91 93133 06060`}
            class="flex flex-row w-fit font-normal text-xs leading-5 cursor-pointer relative group 4k:text-2xl"
          >
            <div className="mt-1 mr-2">
              <CiPhone />
            </div>
            Rishabh - +91 93133 06060
            <span class="absolute inset-x-0 bottom-0 h-[0.2px] bg-white transform scale-x-0  group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
        </div>

        <div>
          <Link
            href={`tel:+91 8595736388`}
            class="flex flex-row w-fit font-normal text-xs leading-5 cursor-pointer relative group 4k:text-2xl"
          >
            <div className="mt-1 mr-2">
              <CiPhone />
            </div>
            Office - +91 85957 36388
            <span class="absolute inset-x-0 bottom-0 h-[0.2px] bg-white transform scale-x-0  group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
        </div>

        <div>
          <Link
            href="mailto:info@headsupb2b.com"
            className="flex flex-row w-fit font-normal text-xs leading-5 cursor-pointer relative group 4k:text-2xl "
          >
            <div className="mt-1 mr-2">
              <MdOutlineMarkEmailRead />
            </div>
            info@headsupb2b.com
            <span className="absolute inset-x-0 bottom-0 h-[0.2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
