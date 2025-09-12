"use client"
import { useRouter } from "next/navigation";
import { IoCloseOutline } from "react-icons/io5";
import React from "react";

interface BannerProps {
  shadow?: string;
  onClose?: () => void;
  link?: string;
  heading: string;
  message: string;
  bg?: string;
}

const Banner: React.FC<BannerProps> = ({ shadow, onClose, link, heading, message, bg }) => {
  const router = useRouter();
  
  return (
    <button
      className={` mt-5 ${shadow ? shadow : ""} ${
        bg ? bg : "bg-[#F7E7C7]"
      } px-4 w-full justify-between flex items-center gap-4  rounded-lg`}
    >
      <div
        onClick={() => link && router.push(link)}
        className="py-2  items-start text-start grid"
      >
        <span className=" text-[16px] font-semibold  ">{heading}</span>
        <span className="  text-[#808080] text-[12px]">{message}</span>
      </div>
      <div
        onClick={onClose}
        className=" bg-white flex items-center justify-center rounded-full "
      >
        <IoCloseOutline name="close" size={24} />
      </div>
    </button>
  );
};

export default Banner;
