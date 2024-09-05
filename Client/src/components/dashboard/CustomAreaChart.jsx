import { AreaChart } from "@tremor/react";
import { format } from "date-fns";
const CustomAreaChart = ({ products }) => {
  const currentDate = new Date();
  const last1week = new Date();
  last1week.setDate(currentDate.getDate() - 7);

  const productWeeklySellRate = {};
  products.forEach((product) => {
    const productSellDate = new Date(product.createdAt);

    if (productSellDate <= currentDate && productSellDate >= last1week) {
      const formattedSellDate = format(new Date(productSellDate), "dd/MM");
      console.log(formattedSellDate);
      if (!productWeeklySellRate[formattedSellDate]) {
        productWeeklySellRate[formattedSellDate] = 0;
      }
      productWeeklySellRate[formattedSellDate] += 1;
    }
  });
  console.log(productWeeklySellRate);
  const chartdata = Object.entries(productWeeklySellRate).map(([key, val]) => ({
    date: key,
    "Product Sell Rate": val,
  }));

  return (
    <div className="mt-3">
      <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Products Sales Rate per Day
      </h3>
      <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        $34,567
      </p>
      <AreaChart
        className="mt-2 h-72"
        data={chartdata}
        index="date"
        yAxisWidth={65}
        categories={["Product Sell Rate"]}
        colors={["indigo", "cyan"]}
      />
    </div>
  );
};

export default CustomAreaChart;
