import React, { useEffect, useState } from "react";
import unknownProduct from "../../assets/newProduct.jpg";

import {
  BookmarkIcon,
  UserIcon,
  BookmarkSlashIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as Bookmark } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { saveProducts, unsaveProduct } from "../../API/productAPI";
import { message } from "antd";
import { useSelector } from "react-redux";
const Card = ({
  product,
  userDoc,
  isSavePage,
  getSavedProductsFromAPI,
  saveProductId,
  savedProducts,
  getProductsHome,
  getSavedProductsHome,
}) => {
  const { user } = useSelector((state) => state.user.user);
  const saveProductHandler = async () => {
    try {
      const response = await saveProducts(product._id);
      if (!response.isSuccess) {
        throw new Error(response.message);
      } else {
        getProductsHome();
        getSavedProductsHome();
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

  const isSavedProduct = (product) => {
    return savedProducts.some((p) => p.product_id._id === product._id);
  };
  return (
    <div className="w-[250px] flex flex-col gap-4 items-center bg-slate-100 rounded-lg py-4 px-2 shadow-lg ">
      <Link to={`/productDetail/${product._id}`}>
        <img
          src={product.images.length ? product.images[0] : unknownProduct}
          alt={product.name}
          className="w-full h-[150px] object-cover rounded-lg self-center"
        />
      </Link>
      <div className="w-full flex justify-between items-center px-4">
        <Link to={`/productDetail/${product._id}`}>
          <p className=" font-bold text-base  ">
            {product.name?.toUpperCase()}
          </p>
        </Link>
        {user && (
          <>
            {!isSavePage ? (
              <>
                {isSavedProduct(product) ? (
                  <Bookmark
                    className="w-5 cursor-pointer"
                    onClick={() => message.warning("Product is already saved!")}
                  />
                ) : (
                  <BookmarkIcon
                    className="w-5 cursor-pointer"
                    onClick={saveProductHandler}
                  />
                )}
              </>
            ) : (
              <BookmarkSlashIcon
                className="w-5 cursor-pointer"
                onClick={unsaveProductHandler}
              />
            )}
          </>
        )}
      </div>
      <p className="text-left text-xs self-start px-4">
        {product.description.length < 35
          ? product.description
          : product.description.slice(0, 35) + "..."}
      </p>
      <div className="w-full h-[1px] bg-slate-400"></div>
      <div className="pl-4 pr-0 w-full flex justify-between ">
        <p className="text-sm flex gap-1 items-center bg-lime-500 p-1 rounded-md text-white">
          <UserIcon className="w-4 " />
          <span>{userDoc ? userDoc.name : product.seller.name} </span>
        </p>
        <p className="text-center self-end px-5 text-[#5052b1] font-bold">
          ${product.price}
        </p>
      </div>
    </div>
  );
};

export default Card;
