import React, { useEffect, useState } from "react";
import HeroSection from "../components/Home/HeroSection";
import { getAllProducts } from "../API/publicAPI";
import { message } from "antd";
import Card from "../components/Home/Card";
import Filter from "../components/Home/Filter";
const Home = () => {
  const [products, setProducts] = useState([]);
  const getProductsHomePage = async () => {
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
  useEffect(() => {
    getProductsHomePage();
  }, []);
  return (
    <section className="flex flex-col gap-4 items-center py-10">
      <HeroSection setProducts={setProducts} />
      <Filter setProducts={setProducts} />
      <div className="w-[80%] flex gap-5 flex-wrap justify-center mt-5">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Home;
