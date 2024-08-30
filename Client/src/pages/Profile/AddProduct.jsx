import { Checkbox, Col, Form, Input, Row, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { addProduct, getOldProduct, updateProduct } from "../../API/productAPI";
const AddProduct = ({
  setActiveTapKey,
  getProducts,
  editMode,
  editProductId,
}) => {
  const [form] = Form.useForm();
  const [seller, setSeller] = useState(null);
  const [productId, setProductId] = useState(null);
  // options for checkBox
  const checkBoxOptions = [
    { label: "Accessories", value: "Accessories" },
    { label: "Vouncher", value: "Vouncher" },
    { label: "Warrenty", value: "Warrenty" },
  ];
  const [submitting, setSubmitting] = useState(false);

  // handling addProduct and editProduct
  const handleSellProduct = async (values) => {
    setSubmitting(true);
    try {
      let response;
      if (editMode) {
        values.seller_id = seller;
        values.product_id = productId;
        console.log(seller, productId);
        response = await updateProduct(values);
      } else {
        response = await addProduct(values);
      }
      if (!response?.isSuccess) {
        setSubmitting(false);
        throw new Error("Action not successful!");
      } else {
        message.success(response.message);
        getProducts();
        setActiveTapKey("1");
        form.resetFields();
      }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

  // getting the old product to edit
  const getOldProductEdit = async () => {
    try {
      const product = await getOldProduct(editProductId);
      if (product) {
        const {
          _id,
          name,
          description,
          price,
          category,
          usagePeriod,
          utilities,
          seller,
        } = product.product;
        setSeller(seller);
        setProductId(_id);
        const modifiedProduct = {
          product_name: name,
          product_description: description,
          product_price: price,
          product_category: category,
          product_usage_period: usagePeriod,
          product_utilities: utilities,
        };
        form.setFieldsValue(modifiedProduct);
        message.success("Edit product loaded!");
      } else {
        throw new Error(product?.error);
      }
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (editMode) {
      getOldProductEdit();
    } else {
      form.resetFields();
    }
  }, [editMode]);
  return (
    <section>
      <Form layout="vertical" onFinish={handleSellProduct} form={form}>
        <h2 className="text-2xl mb-3">
          {editMode ? "Update your product! " : "What are going to sell today?"}
        </h2>
        <Form.Item
          label={"Product Name"}
          name="product_name"
          rules={[
            {
              required: true,
              message: "Please fill your product name",
            },
          ]}
          hasFeedback
        >
          <Input type="text" placeholder="product_name" />
        </Form.Item>
        <Form.Item
          label={"Product Description"}
          name="product_description"
          rules={[
            {
              required: true,
              message: "Please fill your product name",
            },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item>
          <Row gutter={7}>
            <Col span={8}>
              <Form.Item
                label={"Price"}
                name={"product_price"}
                rules={[{ required: true, message: "Price is required!" }]}
              >
                <Input type="number" placeholder="5000 MMK" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label={"Category"}
                name={"product_category"}
                rules={[{ required: true, message: "Category is required!" }]}
              >
                <Select
                  style={{
                    width: 200,
                  }}
                  options={[
                    {
                      label: "Electronics",
                      value: "Electronics",
                    },
                    {
                      label: "Fashion & Apparel",
                      value: "Fashion & Apparel",
                    },
                    {
                      label: "Home & Living",
                      value: "Home & Living",
                    },
                    {
                      label: "Health & Beauty",
                      value: "Health & Beauty",
                    },
                    {
                      label: "Books & Media",
                      value: "Books & Media",
                    },
                    {
                      label: "Automotive",
                      value: "Automotive",
                    },
                    {
                      label: "Groceries & Gourmet Food",
                      value: "Groceries & Gourmet Food",
                    },
                    {
                      label: "Pet Supplies",
                      value: "Pet Supplies",
                    },
                    {
                      label: "Office & School Supplies",
                      value: "Office & School Supplies",
                    },
                    {
                      label: "Gifts & Occasions",
                      value: "Gifts & Occasions",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label={"Usage Period"}
                name={"product_usage_period"}
                rules={[
                  { required: true, message: "Usage period is required!" },
                ]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name={"product_utilities"}
          label={"The product will have..."}
        >
          <Checkbox.Group options={checkBoxOptions} />
        </Form.Item>
        <button
          type="submit"
          className={`flex gap-2 items-center text-white p-2 bg-[#5052b1] rounded-md productAddButton ${
            submitting && `disabled`
          }`}
        >
          {!editMode && <PlusCircleOutlined className="" />}
          <span className="">
            {editMode ? "Update product" : "Post  product"}
          </span>
        </button>
      </Form>
    </section>
  );
};

export default AddProduct;
