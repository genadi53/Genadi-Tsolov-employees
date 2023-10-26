"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    const res = getProjectEmployees(data);
    setTgData(res);
  }, [data]);

  return (
    <div className="flex flex-col w-full">
      <Button className="my-4" onClick={() => clearDataFn()}>
        Clear Table
      </Button>

      <Table className="text-center w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[64px] font-semibold text-center">
              ID 1
            </TableHead>
            <TableHead className="w-[64px] font-semibold text-center">
              ID 2
            </TableHead>
            <TableHead className="w-[64px] font-semibold text-center">
              Days
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {togetherData &&
            togetherData.map((entry, idx) => (
              <TableRow key={`${entry.empId1}-${entry.empId2}-${idx}`}>
                <TableCell className="w-[64px]">{entry.empId1}</TableCell>
                <TableCell className="w-[64px]">{entry.empId2}</TableCell>
                <TableCell className="w-[64px]">{entry.days}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
