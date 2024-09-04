import moment from "moment";
import React, { useEffect, useState } from "react";
import { getAllUsers, setUserStatus } from "../../API/adminAPI";
import { message } from "antd";
const Users = () => {
  const [users, setUsers] = useState([]);

  const getAllUsersForAdmin = async () => {
    try {
      const response = await getAllUsers();
      if (!response.isSuccess) {
        throw new Error("Users data cannot fetch");
      } else {
        setUsers(response.users);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getAllUsersForAdmin();
  }, []);

  const setUserStatusHandler = async (userId, userStatus) => {
    try {
      const response = await setUserStatus({ userId, userStatus });
      if (!response.isSuccess) {
        throw new Error("Something Wrong!");
      } else {
        getAllUsersForAdmin();
        if (userStatus === "banned") {
          message.warning(response.message);
        } else {
          message.info(response.message);
        }
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const banHandler = async (userId) => {
    await setUserStatusHandler(userId, "banned");
  };
  const unbanHandler = async (userId) => {
    await setUserStatusHandler(userId, "active");
  };
  return (
    <section>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Join Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              <>
                {users.map((user) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={user._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.name}
                    </th>
                    <td className="px-6 py-4">{user.email}</td>

                    <td className="px-6 py-4"> {user.role}</td>

                    <td className={`px-6 py-4  `}>
                      {user.status === "active" && (
                        <span className="text-white bg-green-500 p-1 rounded-md text-md">
                          Active
                        </span>
                      )}
                      {user.status === "banned" && (
                        <span className="text-white bg-red-700 p-1 rounded-md text-md">
                          Banned
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {moment(user.createdAt).format("L")}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-3">
                        {user.status === "active" && (
                          <button
                            onClick={() => banHandler(user._id)}
                            className="font-medium text-md text-red-600 dark:text-blue-500 hover:underline"
                          >
                            Ban
                          </button>
                        )}
                        {user.status !== "active" && (
                          <button
                            onClick={() => unbanHandler(user._id)}
                            className="font-medium text-md text-fuchsia-500 dark:text-blue-500 hover:underline"
                          >
                            Unban
                          </button>
                        )}
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

export default Users;
