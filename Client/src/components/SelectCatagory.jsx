import { Select } from "antd";
import React from "react";

const SelectCatagory = () => {
  // handle change for category select
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <Select
        defaultValue=""
        style={{
          width: 200,
        }}
        onChange={handleChange}
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
    </>
  );
};

export default SelectCatagory;
