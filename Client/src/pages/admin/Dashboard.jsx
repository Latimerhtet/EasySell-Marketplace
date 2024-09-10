import React, { useEffect, useState } from "react";
import CardComponent from "../../components/dashboard/Card";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import CustomAreaChart from "../../components/dashboard/CustomAreaChart";
import CustomBarList from "../../components/dashboard/CustomBarList";
const Dashboard = ({
  products,
  users,
  totalProductsCount,
  pendingProducts,
}) => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const getTotalSales = () => {
    const totalAmount = products.reduce((initial, arr) => {
      return initial + Number(arr.price);
    }, 0);
    setTotalSales(totalAmount);
  };

  useEffect(() => {
    if (products.length) {
      getTotalSales();
      setTotalProducts(products.length);
    }
    if (users.length) {
      setTotalUsers(users.length);
    }
  }, [products]);
  return (
    <section className="pb-10">
      <div className="w-full flex items-center  gap-5 lg:flex-nowrap flex-wrap">
        <CardComponent
          title={"Sales Percent"}
          value={`$ ${totalSales}`}
          icon={CreditCardIcon}
          option={"$"}
        />
        <CardComponent
          title={"Active Users"}
          value={totalUsers}
          option={"Users"}
          icon={UserGroupIcon}
        />
        <CardComponent
          title={"Total Products"}
          value={totalProductsCount}
          option={"Products"}
          icon={ShoppingBagIcon}
        />
        <CardComponent
          title={"Pending Products"}
          value={pendingProducts}
          option={"Products"}
          icon={ShoppingBagIcon}
        />
      </div>
      <CustomAreaChart products={products} />
      <CustomBarList products={products} />
    </section>
  );
};

export default Dashboard;
