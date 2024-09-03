import React, { useEffect, useState } from "react";
import { getAllproducts, deleteProduct } from "../../API/productAPI";
import moment from "moment";
import { message } from "antd";
import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

const Products = ({
  products,
  setEditMode,
  setActiveTapKey,
  setEditProductId,
  getProducts,
  setUploadMode,
}) => {
  const editHandler = (id) => {
    setEditMode(true);
    setEditProductId(id);
    setActiveTapKey("3");
    setUploadMode(false);
  };
  const deleteHandler = async (id) => {
    try {
      const deletedProduct = await deleteProduct(id);
      if (deletedProduct.isSuccess) {
        getProducts();
        message.success(deletedProduct.message);
        window.location.reload();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error.message);
      message.error(error.message);
    }
  };
  return (
    <section>
      <h1 className="text-2xl font-bold mb-5">Products Lists</h1>
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
            {products.length > 0 ? (
              <>
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
                          onClick={() => {
                            setActiveTapKey("3");
                            setEditMode(true);
                            setEditProductId(product._id);
                            setUploadMode(true);
                          }}
                          className="font-medium text-xl text-fuchsia-500 dark:text-blue-500 hover:underline"
                        >
                          <CloudUploadOutlined />
                        </button>
                        <button
                          onClick={() => editHandler(product._id)}
                          className="font-medium text-xl text-blue-600 dark:text-blue-500 hover:underline "
                        >
                          <EditOutlined />
                        </button>
                        <button
                          onClick={() => deleteHandler(product._id)}
                          className="font-medium text-xl text-red-600 dark:text-blue-500 hover:underline"
                        >
                          <DeleteOutlined />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-3">
                  You haven't added any item to sell yet!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Products;
