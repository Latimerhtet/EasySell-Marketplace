import { formatDistanceToNowStrict } from "date-fns";
import React from "react";

const BidCard = ({ bid }) => {
  return (
    <div className="w-full flex flex-col gap-2 p-3 bg-slate-200 text-[#5052b1] rounded-md">
      <div className="w-full flex justify-between ">
        <h2 className="text-sm font-semibold">{bid.buyer_id.name}</h2>
        <p className="text-sm font-semibold">
          {formatDistanceToNowStrict(new Date(bid.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      <div>
        <p className="text-lg">{bid.message}</p>
      </div>
    </div>
  );
};

export default BidCard;
