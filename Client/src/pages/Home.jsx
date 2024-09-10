import React, { useEffect, useState } from "react";
import HeroSection from "../components/Home/HeroSection";
import { getAllProducts } from "../API/publicAPI";
import { getSavedProducts } from "../API/productAPI";
import { Pagination, message } from "antd";
import Card from "../components/Home/Card";
import Filter from "../components/Home/Filter";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [savedProducts, setSavedproducts] = useState([]);
  const [productsAmount, setProductsAmount] = useState(6);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [current, setCurrent] = useState(1);
  const getProductsHomePage = async (current, productsAmount) => {
    try {
      const response = await getAllProducts(current, productsAmount);
      if (!response.isSuccess) {
        throw new Error("Action is not successful!");
      }
      console.log(response.products);
      setTotalProducts(response.totalProducts);
      setTotalPages(response.totalPages);
      setCurrent(response.currentPage);
      setProducts(response.products);
    } catch (error) {
      message.error(error.message);
    }
  };
  const getSavedProductsHomePage = async () => {
    try {
      const response = await getSavedProducts();

      if (!response.isSuccess) {
        throw new Error("Action is not successful!");
      }
      setSavedproducts(response.products);
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getProductsHomePage(current, 6);
    getSavedProductsHomePage();
  }, []);
  const paginationOnChange = (page, pageSize) => {
    setCurrent(page);
    getProductsHomePage(page, pageSize);
  };
  return (
    <section className="flex flex-col gap-4 items-center py-10">
      <HeroSection setProducts={setProducts} />
      <Filter setProducts={setProducts} />
      <div className="w-[80%] flex gap-5 flex-wrap justify-center mt-5">
        {products.map((product) => (
          <Card
            key={product._id}
            product={product}
            savedProducts={savedProducts}
            getProductsHome={getProductsHomePage}
            getSavedProductsHome={getSavedProductsHomePage}
          />
        ))}
      </div>
      <div className=" mt-8">
        <Pagination
          align="end"
          current={current}
          onChange={paginationOnChange}
          total={totalProducts}
          defaultPageSize={productsAmount}
        />
      </div>
    </section>
  );
};

export default Home;
