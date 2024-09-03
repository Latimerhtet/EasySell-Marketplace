import moment from "moment";
import React from "react";

const Products = ({ products }) => {
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
