"use client";

import { useSettingModal } from "@/context/model-settings";
import React from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Button from "@/components/custom/Button";

// Type definition for doctor data
interface Doctor {
  profileImage?: string;
  fullName?: string;
  specialty?: string;
  experience?: string;
  about?: string;
  price?: number;
}

const DoctorInfoModal: React.FC = () => {
  const { toggleModal, modals, modalData } = useSettingModal();
  const doctor: Doctor | undefined = modalData?.doctorInfoModal;

  // Helper function to get name initials
  const getNameInitials = (name?: string): string => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!doctor) return null;

  return (
    <div
      className={`fixed  top-0 right-0  w-full h-screen !h-[100dvh] z-50 items-end lg:items-center justify-center ${
        modals.doctorInfoModal ? "flex" : "hidden"
      }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => toggleModal("doctorInfoModal")}
      />

      <div className="bg-white font-poppins rounded-b-[0px] lg:rounded-b-[16px] rounded-[16px] shadow-lg max-h-[70vh] w-full lg:max-w-[600px] overflow-hidden z-10 flex flex-col">
        {/* Header */}
        <div className="p-5 mt-5 flex-shrink-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-black text-[24px] text-[#1D1C1D]">
              Doctor&apos;s Profile
            </h2>
            <button
              className="text-gray-400 hover:text-gray-600 duration-500 transition-colors"
              onClick={() => toggleModal("doctorInfoModal")}
            >
              <IoClose size={25} />
            </button>
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto px-5 pb-5">
          {/* Doctor Image and Basic Info */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-4">
              {doctor.profileImage ? (
                <Image
                  src={doctor.profileImage}
                  width={120}
                  height={120}
                  alt={doctor.fullName || "Doctor"}
                  className="w-[120px] h-[120px] rounded-full object-cover bg-gray-200"
                />
              ) : (
                <div className="w-[120px] h-[120px] rounded-full bg-blue-100 flex items-center justify-center text-primary text-2xl font-bold">
                  {getNameInitials(doctor.fullName)}
                </div>
              )}
            </div>

            <h3 className="text-xl font-semibold text-[#1D1C1D] mb-1">
              {doctor.fullName || "Dr. Unknown"}
            </h3>

            <p className="text-primary font-medium text-sm mb-3">
              {doctor.specialty || "General Practitioner"}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Image
                src="/svg/workspace_premium.svg"
                width={40}
                height={40}
                alt="tag"
                className=" h-[16px] w-auto"
              />
              <span>{doctor.experience || "2 Years"} of Experience</span>
            </div>
          </div>

          {/* About Me Section */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-[#1D1C1D] mb-3">
              About Me
            </h4>
            <p className="text-[#605D64] text-sm leading-relaxed">
              {doctor.about ||
                "Dr. Stella is the top most heart surgeon in Flower Hospital. She has done over 100 successful surgeries within past 3 years. She has achieved several awards for her wonderful contribution in her own field. She's available for private consultation for given schedules..."}
              {doctor.about && doctor.about.length > 200 && (
                <button className="text-primary ml-1 font-medium">
                  Read More
                </button>
              )}
            </p>
          </div>

          {/* Other Info Section */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-[#1D1C1D] mb-4">
              Other Info
            </h4>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Consultation Fee</span>
                <span className="font-semibold text-[#1D1C1D]">
                  {doctor.price ? `₦${doctor.price} per hour` : "Free"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Availability</span>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-[#34C759] text-white text-xs rounded-full font-medium">
                    Availability Today
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Book Consult Button */}
          <div className="mt-6 pb-5">
            <Button
              onClick={() => {
                toggleModal("doctorInfoModal");
              }}
              text={"Book Consult"}
              className=" rounded-[4px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoModal;
