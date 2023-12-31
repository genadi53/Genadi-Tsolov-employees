"use client";
import React, { useState } from "react";
import { UploadIcon } from "@/components/uploadIcon";
import { Button } from "./ui/button";
import { ParsedCSVData } from "@/utils/types";
import { getParsedData } from "@/utils/csv";
import { Input } from "./ui/input";

type FormProps = {
  setData: React.Dispatch<React.SetStateAction<ParsedCSVData | null>>;
};

export const UploadForm: React.FC<FormProps> = ({ setData }) => {
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const submit = () => {
    if (!csvFile) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (reader.result && typeof reader.result === "string") {
        setData(getParsedData(reader.result));
      }
    });
    reader.readAsText(csvFile);
  };

  return (
    <div className="lg:p-8">
      <form className="flex flex-col justify-center">
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-700/25 px-6 py-10 dark:border-slate-500">
          <div className="text-center">
            <UploadIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex items-center justify-evenly text-sm leading-6 text-gray-600">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input
                  type="file"
                  accept=".csv"
                  onChange={(e) => {
                    if (!e.target.files) return;
                    setCsvFile(e.target.files[0]);
                  }}
                  className="flex flex-row justify-between items-center"
                />
              </div>
            </div>
            <p className="my-2 text-xs leading-5 text-primaryDark dark:text-white">
              Choose a CSV file to upload
            </p>
          </div>
        </div>
        <Button
          className="my-4"
          onClick={(e) => {
            e.preventDefault();
            if (csvFile) submit();
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
