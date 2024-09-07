import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../API/publicAPI";
import { message } from "antd";
import unknownProduct from "../assets/newProduct.jpg";
import { TagIcon } from "@heroicons/react/24/solid";
import { CheckCircleFilled } from "@ant-design/icons";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns";
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [selectedImg, setSelectedImg] = useState("");
  console.log(product.images);
  const getProductDetail = async () => {
    try {
      const response = await getProduct(id);
      if (!response.isSuccess) {
        throw new Error(response.message);
      }
      setProduct(response.product);
      setSelectedImg(response.product?.images[0]);
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getProductDetail();
  }, []);
  return (
    <section className="h-full flex gap-1 pt-4">
      <div className="basis-2/5 flex flex-col items-center gap-3">
        <img
          src={selectedImg ? selectedImg : unknownProduct}
          alt={product.name}
          className="w-[80%] h-[250px] rounded-lg object-cover"
        />
        {!selectedImg && (
          <p className="text-red-600">The product doesn't include images!</p>
        )}
        <div className="w-full flex gap-2 justify-start px-5 ">
          {product.images?.length > 0 &&
            product.images.map((image) => (
              <img
                className={`w-28 h-20 rounded-lg cursor-pointer object-cover ${
                  selectedImg === image && "opacity-45"
                }`}
                src={image}
                alt={product.name}
                onClick={() => setSelectedImg(image)}
              />
            ))}
        </div>
      </div>
      <div className="basis-3/5 flex flex-col items-start gap-4 ">
        <p className="text-4xl font-bold">{product.name}</p>
        <p className="text-xl">{product.description}</p>
        <p className="p-2 bg-teal-600 text-white rounded-xl flex gap-2 ">
          <TagIcon className="w-5" /> <span>{product.category}</span>
        </p>
        <p className="text-3xl text-red-800  "> ${product.price}</p>
        <div className="flex gap-3">
          {product.utilities?.map((utility) => (
            <p className="flex gap-2">
              <CheckCircleFilled className="text-[#5052b1]" />
              <span className="text-[#5052b1]">{utility}</span>
            </p>
          ))}
        </div>
        <p className=" flex gap-2 items-center">
          <ClockIcon className="w-5 " />
          <span className="font-bold">{product.usagePeriod}</span>
        </p>
        <div className="w-full flex gap-5 items-center justify-start">
          <button className="flex gap-1 items-center bg-[#5052b1] p-2 rounded-lg text-white">
            <span> Add to Cart</span> <ShoppingCartIcon className="w-6" />
          </button>
          {/* <button className="flex gap-1 items-center bg-[#5052b1] p-2 rounded-lg text-white">
            <span>Save</span>
            <BookmarkIcon className="w-6" />
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;

// formatDistanceToNow(new Date(product.usagePeriod));
