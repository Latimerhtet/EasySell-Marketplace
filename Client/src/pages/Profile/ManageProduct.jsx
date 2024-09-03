import { Checkbox, Col, Form, Input, Row, Select, Tabs, message } from "antd";
import React, { useEffect, useState } from "react";
import ProductForm from "../../components/ProductForm";
import Upload from "./Upload";
const ManageProduct = ({
  setActiveTapKey,
  getProducts,
  editMode,
  editProductId,
  uploadMode,
  setUploadMode,
}) => {
  const items = [
    {
      key: "1",
      label: "Product details",
      children: (
        <ProductForm
          setActiveTapKey={setActiveTapKey}
          getProducts={getProducts}
          editMode={editMode}
          editProductId={editProductId}
        />
      ),
    },
    editMode && {
      key: "2",
      label: "Image Uploads",
      children: (
        <Upload
          editProductId={editProductId}
          setActiveTapKey={setActiveTapKey}
        />
      ),
    },
  ];

  return (
    <section className="lg:w-[900px] flex justify-start">
      <Tabs defaultActiveKey={uploadMode ? "2" : "1"} items={items} />
    </section>
  );
};

export default ManageProduct;
