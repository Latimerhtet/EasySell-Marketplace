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
    <section className="w-[90%] flex justify-center">
      <div className="w-full flex gap-10 justify-start flex-wrap">
        {products ? (
          products.map((product) => (
            <Card product={product.product_id} userDoc={product.user_id} />
          ))
        ) : (
          <p>You don't have saved items!</p>
        )}
      </div>
    </section>
  );
};

export default SavedProducts;
