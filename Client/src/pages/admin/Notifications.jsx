import React, { useEffect, useState } from "react";

import { formatDistanceToNowStrict } from "date-fns";
import {
  BellIcon,
  DevicePhoneMobileIcon as PhoneIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
const Notifications = ({ notis }) => {
  return (
    <section className="w-full">
      <p className="text-2xl font-bold flex gap-2 items-center mb-5">
        <span>Notifications</span>
        <BellIcon className="w-5" />
      </p>
      {notis.length > 0 ? (
        <div className="flex flex-col gap-5">
          {notis.map((noti) => {
            return (
              <div
                key={noti._id}
                className="w-full flex flex-col gap-2 bg-slate-200 p-2 rounded-lg text-[#5052b1]"
              >
                <div className="w-full flex justify-between">
                  <p>{noti.title}</p>
                  <p>
                    {formatDistanceToNowStrict(new Date(noti.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg">{noti.message}</p>
                  <p className="flex gap-1 items-center font-bold">
                    <PhoneIcon className="w-3" />
                    <span className="tracking-wide">{noti.phone_number}</span>
                  </p>
                </div>
                <div className="h-[1px] w-full bg-slate-300"></div>
                <div>
                  <button className="text-green-400 text-right underline">
                    View Bids
                  </button>
                  <Link
                    className="text-green-400 text-right underline"
                    to={`/productDetail/${noti.product_id}`}
                  >
                    View Bids
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>You don't have notificatins yet</p>
      )}
    </section>
  );
};

export default Notifications;
