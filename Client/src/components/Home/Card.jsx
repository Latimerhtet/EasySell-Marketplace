import React from "react";
import unknownProduct from "../../assets/newProduct.jpg";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import {
  BookmarkIcon,
  UserIcon,
  BookmarkSlashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { saveProducts, unsaveProduct } from "../../API/productAPI";
import { message } from "antd";
const Card = ({
  product,
  userDoc,
  isSavePage,
  getSavedProductsFromAPI,
  saveProductId,
}) => {
  console.log(product.name);
  const saveProductHandler = async () => {
    try {
      const response = await saveProducts(product._id);
      if (!response.isSuccess) {
        throw new Error(response.message);
      } else {
        message.success(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const unsaveProductHandler = async () => {
    try {
      const response = await unsaveProduct(saveProductId);
      if (!response.isSuccess) {
        throw new Error(response.message);
      } else {
        getSavedProductsFromAPI();
        message.success(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div className="basis-1/4 flex flex-col gap-4 items-center bg-slate-100 rounded-lg py-4 px-1 shadow-lg ">
      <img
        src={product.images.length ? product.images[0] : unknownProduct}
        alt={product.name}
        className="w-[90%] h-[150px] object-cover rounded-lg"
      />
      <div className="w-full flex justify-between items-center px-4">
        <p className=" font-bold text-base  ">{product.name?.toUpperCase()}</p>
        {!isSavePage ? (
          <BookmarkIcon
            className="w-5 cursor-pointer"
            onClick={saveProductHandler}
          />
        ) : (
          <BookmarkSlashIcon
            className="w-5 cursor-pointer"
            onClick={unsaveProductHandler}
          />
        )}
      </div>
      <p className="text-center text-xs self-start px-4">
        {product.description.length < 35
          ? product.description
          : product.description.slice(0, 35) + "..."}
      </p>
      <div className="pl-4 pr-0 w-full flex justify-between ">
        <p className="text-sm flex gap-1 items-center bg-lime-500 p-1 rounded-md text-white">
          <UserIcon className="w-4 " />
          <span>{userDoc ? userDoc.name : product.seller.name} </span>
        </p>
        <p className="text-center self-end px-5 text-[#5052b1] font-bold">
          ${product.price}
        </p>
      </div>

      <div className=" flex gap-5">
        <button className="p-2 px-5 rounded-full bg-[#5052b1] text-white flex gap-2 items-center">
          <span>Add</span> <ShoppingCartIcon className="w-5" />
        </button>
        <Link to={`/productDetail/${product._id}`}>
          <button className="border-b-2 p-2 px-5 border-slate-100 hover:border-b-[#5052b1]">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
