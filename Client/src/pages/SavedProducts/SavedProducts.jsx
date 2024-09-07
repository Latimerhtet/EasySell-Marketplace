import React, { useEffect, useState } from "react";
import { getSavedProducts } from "../../API/productAPI";
import { message } from "antd";
import Card from "../../components/Home/Card";
const SavedProducts = () => {
  const [products, setProducts] = useState([]);
  const getSavedProductsfromAPI = async () => {
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
  };
  useEffect(() => {
    getSavedProductsfromAPI();
  }, []);

  return (
    <section className="w-[90%] h-full flex justify-center">
      {products.length > 0 ? (
        <div className="w-full flex gap-10 justify-start flex-wrap">
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
        <div className="flex justify-center">
          <p className="w-[300px] text-2xl text-center">
            You don't have saved items!
          </p>
        </div>
      )}
    </section>
  );
};

export default SavedProducts;
