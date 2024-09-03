import { Tabs, message } from "antd";
import React, { useEffect, useState } from "react";
import Users from "./Users";
import Products from "./Products";
import { getAllProducts } from "../../API/adminAPI";
import General from "./General";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  const [activeTapKey, setActiveTapKey] = useState("1");
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const getAllProductsForAdmin = async () => {
    try {
      const products = await getAllProducts();
      if (products.isSuccess) {
        setProducts(products.products);
      } else {
        throw new Error(products?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isAdmin = () => {
    if (user.user.role !== "admin") {
      navigate("/");
    }
  };
  useEffect(() => {
    isAdmin();
    getAllProductsForAdmin();
  }, [activeTapKey]);
  const items = [
    {
      key: "1",
      label: "Manage Products",
      children: <Products products={products} />,
    },

    {
      key: "2",
      label: "Manage Users",
      children: <Users />,
    },
    {
      key: "3",
      label: "General",
      children: <General />,
    },
    {
      key: "4",
      label: "Notification",
      children: <p>Notifications</p>,
    },
  ];
  const activeKeyChangeEventHandler = (key) => {
    setActiveTapKey(key);
  };
  return (
    <section className="lg:w-[950px] sm:w-[400px]  flex justify-start">
      <Tabs
        activeKey={activeTapKey}
        onChange={(key) => activeKeyChangeEventHandler(key)}
        items={items}
        tabPosition="left"
        style={{
          width: "100%",
          height: 220,
        }}
      />
    </section>
  );
};

export default Admin;
