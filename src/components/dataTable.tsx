"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { EmployeesWorkingTogetherData, ParsedCSVData } from "@/utils/types";
import { getProjectEmployees } from "@/utils/csv";

type TableProps = {
  data: ParsedCSVData;
  clearDataFn: () => void;
};

export const DataTable: React.FC<TableProps> = ({ data, clearDataFn }) => {
  const [togetherData, setTgData] = useState<
    EmployeesWorkingTogetherData[] | null
  >(null);

  useEffect(() => {
    async function a() {
      console.log(data);
      const res = await getProjectEmployees(data);
      console.log(res);
      setTgData(res);
    }
    a();
    // console.log(data);
    // const res = getProjectEmployees(data);
    // console.log(res);
    // setTgData(res);
  }, [data]);

  return (
    <div>
      <div>
        {togetherData &&
          togetherData.map((entry, idx) => (
            <div
              key={`${entry.empId1}-${entry.empId2}-${idx}`}
              className="text-base text-center flex flex-row justify-between items-center"
            >
              <div>{entry.empId1}</div>
              <div>{entry.empId2}</div>
              <div>{entry.days}</div>
            </div>
          ))}
      </div>
      <Button onClick={() => clearDataFn()}>Clear Table</Button>
    </div>
  );
};
