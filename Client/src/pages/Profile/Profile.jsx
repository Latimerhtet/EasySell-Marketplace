import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Products from "./Products";
import ManageProduct from "./ManageProduct";
import { useNavigate } from "react-router-dom";
import General from "./General";
import { getAllproducts } from "../../API/productAPI";
const Profile = () => {
  const [activeTapKey, setActiveTapKey] = useState("1");
  const [sellerProducts, setSellerProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [uploadMode, setUploadMode] = useState(false);
  const [editProductId, setEditProductId] = useState("");

  const getProducts = async () => {
    try {
      const products = await getAllproducts();
      // console.log(products);
      if (products.isSuccess) {
        setSellerProducts(products.products);
      } else {
        throw new Error(products?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (activeTapKey !== "3") {
      setEditMode(false);
      setEditProductId(null);
    }
    getProducts();
  }, [activeTapKey]);
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
          setUploadMode={setUploadMode}
        />
      ),
    },
    {
      key: "2",
      label: "Profile",
      children: <General />,
    },
    {
      key: "3",
      label: "Manage Product",
      children: (
        <ManageProduct
          setActiveTapKey={setActiveTapKey}
          getProducts={getProducts}
          editMode={editMode}
          editProductId={editProductId}
          activeTapKey={activeTapKey}
          uploadMode={uploadMode}
          setUploadMode={setUploadMode}
        />
      ),
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

export default Profile;
