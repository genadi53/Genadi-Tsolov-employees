"use client";
import React from "react";
import { Button } from "./ui/button";

type TablePropsType = {
  clearDataFn: () => void;
};

export const DataTable: React.FC<TablePropsType> = ({ clearDataFn }) => {
  return (
    <div>
      <div>Data</div>
      <Button onClick={() => clearDataFn()}>Clear Table</Button>
    </div>
  );
};
