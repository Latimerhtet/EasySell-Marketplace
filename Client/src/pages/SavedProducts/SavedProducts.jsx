import React, { useEffect, useState } from "react";
import { getSavedProducts } from "../../API/productAPI";
import { message } from "antd";
import Card from "../../components/Home/Card";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../store/Slices/loaderSlice";
import { InfinitySpin } from "react-loader-spinner";
const SavedProducts = () => {
  const [products, setProducts] = useState([]);
  const { isProcessing } = useSelector((state) => state.user.loader);
  const dispatch = useDispatch();
  const getSavedProductsfromAPI = async () => {
    dispatch(setLoader(true));
    try {
      const response = await getSavedProducts();
      if (!response.isSuccess) {
        throw new Error(response.message);
      }
      console.log(response.products);
      setProducts(response.products);
    } catch (error) {
      message.error(error.message);
    }
    dispatch(setLoader(false));
  };
  useEffect(() => {
    getSavedProductsfromAPI();
  }, []);

  return (
    <section className="w-full p-5 flex flex-col">
      <p className="text-2xl text-left mb-4 font-bold text-[#5052b1]">
        Saved Products List
      </p>
      {isProcessing ? (
        <div className="mt-20">
          <InfinitySpin color="#5052b1" />
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <div className="w-[70vw] flex  gap-5 justify-start flex-wrap">
              {products.map((product) => (
                <Card
                  isSavePage={true}
                  product={product.product_id}
                  userDoc={product.user_id}
                  getSavedProductsFromAPI={getSavedProductsfromAPI}
                  saveProductId={product._id}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-start">
              <p className="w-[300px] text-2xl text-left text-red-400">
                You don't have saved items!
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default SavedProducts;
