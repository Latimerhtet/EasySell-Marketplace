import React from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
const Address = () => {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-slate-100 p-3">
      <div className="flex gap-3 items-center">
        <EnvelopeIcon className="w-[55px] bg-blue-300 p-3  rounded-full" />
        <div>
          <p className="text-lg font-bold">Email</p>
          <p>kaunghtet.htet2003@gmail.com</p>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <PhoneIcon className="w-[55px] bg-blue-300 p-3  rounded-full" />
        <div>
          <p className="text-lg font-bold">Phone</p>
          <p>09789788605</p>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <BuildingLibraryIcon className="w-[55px] bg-blue-300 p-3  rounded-full" />
        <div>
          <p className="text-lg font-bold">Address</p>
          <p>Yangon, Myanmar</p>
        </div>
      </div>
    </div>
  );
};

export default Address;
