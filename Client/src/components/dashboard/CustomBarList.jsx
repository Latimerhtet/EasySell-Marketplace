import { BarList, Card } from "@tremor/react";
const CustomBarList = ({ products }) => {
  let data = [
    {
      name: "Electronics",
      value: 0,
    },
    {
      name: "Fashion & Apparel",
      value: 0,
    },
    {
      name: "Home & Living",
      value: 0,
    },
    {
      name: "Health & Beauty",
      value: 0,
    },
    {
      name: "Books & Media",
      value: 0,
    },
    {
      name: "Automotive",
      value: 0,
    },
    {
      name: "Groceries & Gourmet Food",
      value: 0,
    },
    {
      name: "Pet Supplies",
      value: 0,
    },
    {
      name: "Office & School Supplies",
      value: 0,
    },
    {
      name: "Gifts & Occasions",
      value: 0,
    },
  ];
  products.forEach((product) => {
    data.map((datum) => {
      if (datum.name === product.category) {
        datum.value += 1;
      }
    });
  });

  console.log(data);
  return (
    <>
      <Card className=" w-full mt-5 ">
        <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
          Product Category Analytics
        </h3>
        <p className="mt-4 text-tremor-default flex items-center justify-between text-tremor-content dark:text-dark-tremor-content">
          <span>Category</span>
          <span>No. of Products</span>
        </p>
        <BarList data={data} className="mt-2" />
      </Card>
    </>
  );
};

export default CustomBarList;
