"use client";
import { useState } from "react";
import { UploadForm } from "@/components/uploadForm";
import { DataTable } from "@/components/dataTable";
import { ParsedCSVData } from "@/utils/types";

export default function Home() {
  const [csvData, setCsvData] = useState<ParsedCSVData | null>(null);
  const clearData = () => setCsvData(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!csvData ? (
        <UploadForm setData={setCsvData} />
      ) : (
        <DataTable clearDataFn={clearData} data={csvData} />
      )}
    </main>
  );
}
