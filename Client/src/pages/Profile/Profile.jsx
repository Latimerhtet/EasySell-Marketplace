import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Products from "./Products";
import AddProduct from "./AddProduct";
import { useNavigate } from "react-router-dom";
import General from "./General";
import { getAllproducts } from "../../API/productAPI";
const Profile = () => {
  const [activeTapKey, setActiveTapKey] = useState("1");
  const [sellerProducts, setSellerProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState("");
  const getProducts = async () => {
    try {
      const products = await getAllproducts();
      console.log(products);
      if (products?.isSuccess) {
        setSellerProducts(products.products);
      } else {
        throw new Error(products?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const items = [
    {
      key: "1",
      label: "Products",
      children: (
        <Products
          getProducts={getProducts}
          products={sellerProducts}
          setEditMode={setEditMode}
          setActiveTapKey={setActiveTapKey}
          setEditProductId={setEditProductId}
        />
      ),
    },
    {
      key: "2",
      label: "Profile",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Manage Product",
      children: (
        <AddProduct
          setActiveTapKey={setActiveTapKey}
          getProducts={getProducts}
          editMode={editMode}
          editProductId={editProductId}
        />
      ),
    },
    {
      key: "4",
      label: "General",
      children: <General />,
    },
  ];

  const activeKeyChangeEventHandler = (key) => {
    setEditMode(false);
    setActiveTapKey(key);
  };

  return (
    <section className="lg:w-[900px] flex justify-start">
      <Tabs
        activeKey={activeTapKey}
        onChange={(key) => activeKeyChangeEventHandler(key)}
        centered
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

export default Profile;
