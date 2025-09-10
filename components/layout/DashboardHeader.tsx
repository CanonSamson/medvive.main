"use client";
import React from "react";
import { BellIcon, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useContextSelector } from "use-context-selector";
import { UserContext } from "@/context/user";
import Avatar from "../ui/avatar";

const DashboardHeader = ({
  showSearch = true,
  showAvatar = true,
  fullName = "M V",
}: {
  showSearch?: boolean;
  showAvatar?: boolean;
  fullName?: string;
}) => {
  const router = useRouter();
    const basedCurrentUserPath = useContextSelector(
    UserContext,
    state => state.basedCurrentUserPath
  )

  if (!basedCurrentUserPath) return <></>

  return (
    <header className="pt-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-8 justify-between items-center h-11">
          <div className="flex flex-1 items-center">
            {showSearch && (
              <div className="relative flex-1 flex  items-center gap-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-300 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 placeholder:text-dark-300 border border-tablet-stroke outline-none focus:border-blue-500 flex-1 rounded-lg h-11"
                />
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                toast.info("No Notification Found");
              }}
              className=" text-primary-600 text-[32px] leading-[1] relative size-10"
            >
              <div className="absolute size-5 rounded-2xl bg-blue-50 border border-[rgba(97,_96,_97,_0.20)] -top-2.5 -right-2.5 text-xs font-semibold flex items-center justify-center leading-[20px] text-blue-600">
                0
              </div>
              <BellIcon />
            </button>
            {showAvatar && (
              <button
                onClick={() => {
                  router.push( `${basedCurrentUserPath}/profile`
                  );
                }}
                className="flex items-center justify-center text-primary-600 rounded-full overflow-hidden size-10"
              >
                <Avatar img={undefined} fullName={fullName} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
