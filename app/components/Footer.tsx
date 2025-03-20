// components/Footer.tsx
import React from "react";
import Link from "next/link";
import { FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa';
import { BiLink } from "react-icons/bi";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#F2F2F2] py-8 mt-10">
      <div className="flex justify-center">
        <div className="w-full max-w-[550px] px-4">
          <div className="flex flex-col space-y-6">
            {/* SNS 링크 */}
            <div className="flex justify-center space-x-6">
              <Link href="https://www.youtube.com/@jinwoochurch">
                <BiLink className="text-gray-700 text-2xl" />
              </Link>
              <Link href="https://www.youtube.com/@jinwoochurch">
                <FaYoutube className="text-gray-700 text-2xl" />
              </Link>
              <Link href="https://www.instagram.com/">
                <FaInstagram className="text-gray-700 text-2xl"/>
              </Link>
              <Link href="https://www.facebook.com/">
                <FaFacebook className="text-gray-700 text-2xl" />
              </Link>
            </div>
            
            {/* 주소 및 연락처 */}
            <div className="text-center text-gray-600">
              <p className="text-sm">
                경기 광주시 도척면 저수지길 25-13
              </p>
              <p className="text-sm">
                031-764-9730
              </p>
              <p className="text-sm">
                jinwoo@korea.net
              </p>
            </div>
            
            {/* 정책 링크 */}
            <div className="flex justify-center space-x-4">
              <Link
                href="/privacy"
                className="text-xs text-gray-500"
              >
                개인정보취급방침
              </Link>
              <Link
                href="/terms"
                className="text-xs text-gray-500"
              >
                이용약관
              </Link>
              <Link
                href="https://pulipinc.notion.site/pulipinc/3456f696776a4374b576f5d3f4527597"
                className="text-xs text-gray-500"
              >
                원격지원
              </Link>
            </div>
            
            {/* 저작권 */}
            <div className="text-center">
              <p className="text-xs text-gray-400">
                © 2025 JINWOO CHURCH. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};