import moment from "moment";
import React from "react";
import { setProductStatus } from "../../API/adminAPI";
import { Pagination, message } from "antd";

const Products = ({
  products,
  getAllProducts,
  totalProducts,
  totalPages,
  currentPage,
  setCurrentPage,
  pageAmount,
}) => {
  const statusHandler = async (productId, productStatus) => {
    try {
      const response = await setProductStatus({
        productId,
        productStatus,
      });
      if (!response.isSuccess) {
        throw new Error("Something went wrong!");
      } else {
        getAllProducts();
        message.success(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const approveHandler = async (productId) => {
    await statusHandler(productId, "approved");
  };
  const rejectHandler = async (productId) => {
    await statusHandler(productId, "rejected");
  };
  const rollbackHandler = async (productId) => {
    await statusHandler(productId, "pending");
  };
  const paginationOnChange = (page, pageSize) => {
    setCurrentPage(page);
    getAllProducts(page, pageSize);
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
                Seller
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

                    <td className="px-6 py-4"> {product.seller.name}</td>
                    <td className="px-6 py-4">
                      {moment(product.createdAt).format("L")}
                    </td>
                    <td className={`px-6 py-4  `}>
                      {product.status === "pending" && (
                        <span className="text-white bg-yellow-600 p-1 rounded-md text-md">
                          Pending
                        </span>
                      )}{" "}
                      {product.status === "approved" && (
                        <span className="text-white bg-green-700 p-1 rounded-md text-md">
                          Approved
                        </span>
                      )}
                      {product.status === "rejected" && (
                        <span className="text-white bg-red-700 p-1 rounded-md text-md">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-3">
                        {product.status !== "pending" && (
                          <button
                            onClick={() => rollbackHandler(product._id)}
                            className="font-medium text-md text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Rollback
                          </button>
                        )}
                        {product.status === "pending" && (
                          <button
                            onClick={() => approveHandler(product._id)}
                            className="font-medium text-md text-fuchsia-500 dark:text-blue-500 hover:underline"
                          >
                            approve
                          </button>
                        )}
                        {product.status !== "rejected" && (
                          <button
                            onClick={() => rejectHandler(product._id)}
                            className="font-medium text-md text-red-600 dark:text-blue-500 hover:underline "
                          >
                            reject
                          </button>
                        )}
                        {/* {product.status === "rejected" && (
                          <button
                            onClick={() => rejectHandler(product._id)}
                            className="font-medium text-md text-red-600 dark:text-blue-500 hover:underline "
                          >
                            reject
                          </button>
                        )} */}
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
      <div className="mt-7">
        <Pagination
          align="center"
          pageSize={pageAmount}
          current={currentPage}
          onChange={paginationOnChange}
          total={totalProducts}
        />
      </div>
    </section>
  );
};

export default Products;
