import React from "react";
import { Card, Text, Badge } from "@tremor/react";

const CardComponent = ({ title, value, icon, option }) => {
  return (
    <>
      <Card
        className="mx-auto max-w-xs "
        decoration="top"
        decorationColor="indigo"
      >
        <div className="flex justify-between items-center mb-2">
          <Text>{title}</Text>
          <Badge icon={icon} size="xs">
            {option}
          </Badge>
        </div>
        <p className="text-2xl font-bold">{value}</p>
      </Card>
    </>
  );
};

export default CardComponent;
