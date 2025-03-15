// components/Footer.tsx
import React from "react";
import Link from "next/link";
import { FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa'; // 필요한 아이콘 import
import { BiLink } from "react-icons/bi";

export const Footer = () => {
  return (
    <div className="flex flex-col w-full items-start">
      <div className="pt-9 pb-12 px-10 bg-[#3a4148] flex flex-col items-center w-full">
        <div className="flex max-w-[1400px] w-full items-start">
          <div className="flex flex-col items-start gap-7 flex-1 self-stretch">
            <div className="flex items-start gap-11 self-stretch w-full">
              <Link
                href="/privacy"
                className="font-medium text-[#cccccc] text-sm whitespace-nowrap tracking-[-0.32px] leading-[25px]"
              >
                개인정보취급방침
              </Link>

              <Link
                href="/terms"
                className="font-medium text-[#cccccc] text-sm whitespace-nowrap tracking-[-0.32px] leading-[25px]"
              >
                이용약관
              </Link>
              <Link
                href="https://pulipinc.notion.site/pulipinc/3456f696776a4374b576f5d3f4527597"
                className="font-medium text-[#cccccc] text-sm whitespace-nowrap tracking-[-0.32px] leading-[25px]"
              >
                원격지원
              </Link>
            </div>

            <div className="relative self-stretch w-full">
                <p className="text-sm font-medium text-[#888888] tracking-[-0.32px] leading-7">
                  경기 광주시 도척면 저수지길 25-13
                  <br />
                  031-764-9730
                </p>
               <p className="text-sm font-medium text-[#888888] tracking-[-0.32px] leading-7 mt-[-0.50px]">jinwoo@korea.net</p>
            </div>

            <div className="flex flex-col items-start self-stretch w-full">
              <p className="self-stretch mt-[-1.00px] font-medium text-[#888888] text-xs tracking-[-0.32px] leading-[25px]">
                © 2025 JINWOO CHURCH. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-[34px] flex-1 self-stretch">
            <div className="flex items-start justify-end self-stretch w-full">
              <div className="inline-flex items-center self-stretch">
                <Link href="https://www.youtube.com/@jinwoochurch" className="ml-[33px]">
                  <BiLink className="text-white text-2xl" />
                </Link>

                <Link href="https://www.youtube.com/@jinwoochurch" className="ml-[33px]">
                   <FaYoutube className="text-white text-2xl" />
                </Link>

                <Link href="https://www.instagram.com/" className="ml-[33px]">
                  <FaInstagram className="text-white text-2xl"/>
                </Link>

                <Link href="https://www.facebook.com/" className="ml-[33px]">
                   <FaFacebook className="text-white text-2xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};