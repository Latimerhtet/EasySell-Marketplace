import { Tabs, message } from "antd";
import React, { useEffect, useState } from "react";
import Users from "./Users";
import Products from "./Products";
import { getAllProducts, getAllUsers } from "../../API/adminAPI";
import General from "./General";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  BellAlertIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Notifications from "./Notifications";
import { getAllNotification } from "../../API/notification";
const Admin = () => {
  const [activeTapKey, setActiveTapKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [notis, setNotis] = useState([]);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  // Pagination for Products page of ADMIN
  const [currentPage, setCurrentPage] = useState(1);
  const [pageAmount, setPageAmount] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pendingProducts, setPendingProducts] = useState(0);
  const getAllProductsForAdmin = async (pageNo = 1, perPage = 8) => {
    try {
      const products = await getAllProducts(pageNo, perPage);
      if (products.isSuccess) {
        setProducts(products.products);
        setCurrentPage(products.currentPage);
        setTotalPages(products.totalPages);
        setTotalProducts(products.totalProducts);
        setPendingProducts(products.pendingProducts);
      } else {
        throw new Error(products?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
  const getNotis = async () => {
    try {
      const response = await getAllNotification();
      if (!response.isSuccess) {
        throw new Error(response.message);
      }
      console.log(response.notifications);
      setNotis(response.notifications);
    } catch (error) {
      console.log(error.message);
    }
  };
  const isAdmin = () => {
    if (user.user.role !== "admin") {
      navigate("/");
    }
  };
  useEffect(() => {
    isAdmin();
    getAllProductsForAdmin();
    getAllUsersForAdmin();
    getNotis();
  }, [activeTapKey]);
  const items = [
    {
      key: "1",
      label: "Dashboard",
      children: (
        <Dashboard
          products={products}
          getAllProducts={getAllProductsForAdmin}
          users={users}
          totalProductsCount={totalProducts}
          pendingProducts={pendingProducts}
        />
      ),
      icon: <ChartBarIcon className="w-6 inline m-0" />,
    },
    {
      key: "2",
      label: "Manage Products",
      children: (
        <Products
          products={products}
          getAllProducts={getAllProductsForAdmin}
          totalProducts={totalProducts}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageAmount={pageAmount}
        />
      ),
      icon: <ClipboardDocumentListIcon className="w-6 inline m-0" />,
    },

    {
      key: "3",
      label: "Manage Users",
      children: (
        <Users users={users} getAllUsersForAdmin={getAllUsersForAdmin} />
      ),
      icon: <UserGroupIcon className="w-6 inline m-0" />,
    },
    {
      key: "4",
      label: "Profile",
      children: <General />,
      icon: <UserCircleIcon className="w-6 inline m-0" />,
    },
    {
      key: "5",
      label: "Notification",
      children: <Notifications notis={notis} />,
      icon: <BellAlertIcon className="w-6 inline m-0" />,
    },
  ];
  const activeKeyChangeEventHandler = (key) => {
    setActiveTapKey(key);
  };
  return (
    <section className="  w-[70vw]   flex justify-center">
      <Tabs
        activeKey={activeTapKey}
        onChange={(key) => activeKeyChangeEventHandler(key)}
        items={items}
        tabPosition="top"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </section>
  );
};

export default Admin;
