import React, { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { getAllProducts, getProductsByFilter } from "../../API/publicAPI";
import { message } from "antd";
const HeroSection = ({ setProducts }) => {
  const [searchKey, setSearchKey] = useState("");

  const filterHandler = async () => {
    if (searchKey.trim().length) {
      try {
        const response = await getProductsByFilter(
          "searchKey",
          searchKey.trim()
        );
        if (!response.isSuccess) {
          throw new Error(response.message);
        } else {
          setProducts(response.products);
        }
      } catch (error) {
        message.error(error.message);
      }
    }
  };

  const cancelFilter = async () => {
    setSearchKey("");
    try {
      const response = await getAllProducts();
      if (!response.isSuccess) {
        throw new Error("Action is not successful!");
      }
      console.log(response.products);
      setProducts(response.products);
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div className="w-full flex flex-col gap-4 items-center ">
      <h2 className="text-3xl font-bold text-[#5052b1]">
        Connecting Buyers and Sellers, Seamlessly
      </h2>
      <p className="w-3/5 text-center">
        Discover the best deals, connect with trusted sellers, and shop
        effortlessly on a platform designed for your needs.
      </p>
      <div className="w-3/5  flex gap-2 items-center">
        <div className="w-full relative">
          <input
            value={searchKey}
            type="text"
            className="w-full border-none px-5 py-2 bg-slate-200 outline-none rounded-md "
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <MagnifyingGlassIcon
            className="w-8 absolute right-2 top-1 col-start-auto text-[#5052b1] cursor-pointer"
            onClick={filterHandler}
          />
        </div>
        {searchKey.length > 0 && (
          <XMarkIcon
            className="w-8 rounded-full cursor-pointer hover:bg-slate-200 p-1"
            onClick={cancelFilter}
          />
        )}
      </div>
    </div>
  );
};

export default HeroSection;
