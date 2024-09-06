import React, { useState } from "react";
import { getAllProducts, getProductsByFilter } from "../../API/publicAPI";

const Filter = ({ setProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const options = [
    {
      value: "Electronics",
    },
    {
      value: "Fashion & Apparel",
    },
    {
      value: "Home & Living",
    },
    {
      value: "Health & Beauty",
    },
    {
      value: "Books & Media",
    },
    {
      value: "Automotive",
    },
    {
      value: "Groceries & Gourmet Food",
    },
    {
      value: "Pet Supplies",
    },
    {
      value: "Office & School Supplies",
    },
    {
      value: "Gifts & Occasions",
    },
  ];
  const categoryFilterHandler = async (category) => {
    try {
      setSelectedCategory(category);
      const response = await getProductsByFilter("category", category.trim());
      if (!response.isSuccess) {
        throw new Error(response.message);
      } else {
        setProducts(response.products);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const removeCategoryFilter = async () => {
    setSelectedCategory("All");
    try {
      const response = await getAllProducts();
      if (!response.isSuccess) {
        throw new Error("Action is not successful!");
      }

      setProducts(response.products);
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div className="w-2/3 flex gap-3 flex-wrap justify-center">
      <button
        value={"All"}
        className={`border-2 border-[#5052b1] p-1 text-[#5052b1] cursor-pointer rounded-md `}
        onClick={removeCategoryFilter}
      >
        All
      </button>
      {options.map((category, index) => (
        <button
          key={index}
          value={category.value}
          className={`border-2 border-[#5052b1] p-1 text-[#5052b1] cursor-pointer rounded-md  ${
            selectedCategory === category.value && "bg-[#5052b1] text-white"
          }`}
          onClick={() => categoryFilterHandler(category.value)}
        >
          {category.value}
        </button>
      ))}
    </div>
  );
};

export default Filter;
