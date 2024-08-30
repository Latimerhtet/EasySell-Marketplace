import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllproducts, deleteProduct } from "../../API/productAPI";
import moment from "moment";
import { formatISO } from "date-fns";
import { message } from "antd";
const Products = ({
  products,
  setEditMode,
  setActiveTapKey,
  setEditProductId,
  getProducts,
}) => {
  const editHandler = (id) => {
    setEditMode(true);
    setEditProductId(id);
    setActiveTapKey("3");
  };
  const deleteHandler = async (id) => {
    try {
      const deletedProduct = await deleteProduct(id);
      if (!deletedProduct.isSuccess) {
        throw new Error("Something went wrong");
      }
      getProducts();
      message.success(deletedProduct.message);
    } catch (error) {
      console.log(error.message);
      message.error(error.message);
    }
  };
  return (
    <section>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={product._id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.category}</td>

                <td className="px-6 py-4">$ {product.price}</td>
                <td className="px-6 py-4">
                  {moment(product.createdAt).format("L")}
                </td>
                <td className={`px-6 py-4 font-bold `}>
                  {product.status === "pending" ? (
                    <span className="text-white bg-yellow-600 p-1 rounded-md">
                      Pending
                    </span>
                  ) : (
                    <span className="text-white bg-green-700 p-1 rounded-md">
                      Approved
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => editHandler(product._id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteHandler(product._id)}
                      className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Products;
