"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { parseExcelToJson, parseGroupedExcel } from "./utils";

export default function ExcelDemoPage() {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [jsonData, setJsonData] = useState<any[]>([]);

  // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = (evt) => {
  //     const bstr = evt.target?.result;
  //     const wb = XLSX.read(bstr, { type: "binary" });
  //     const wsname = wb.SheetNames[0];
  //     const ws = wb.Sheets[wsname];
  //     const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

  //     if (data.length > 0) {
  //       const cols = data[0] as string[];
  //       const rows = data.slice(1);

  //       // Create proper JSON with column names as keys
  //       const jsonData = rows.map((row: any) => {
  //         const obj: any = {};
  //         cols.forEach((col, index) => {
  //           // Use column name as key, or skip if empty
  //           if (col && col.trim()) {
  //             obj[col.trim()] = row[index] !== undefined ? row[index] : null;
  //           }
  //         });
  //         return obj;
  //       });

  //       setColumns(cols);
  //       setData(rows);
  //       setJsonData(jsonData);
  //     }
  //   };
  //   reader.readAsBinaryString(file);
  // };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("TESSSS", file);
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const result = parseGroupedExcel(arrayBuffer);
    console.log({ result });
    console.log("AkHIR");

    setJsonData(result);
  };

  console.log({ jsonData });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Excel Import Demo</h1>

      <div className="mb-6">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
        />
      </div>

      <>
        <div className="mb-6 hidden">
          <h2 className="text-xl font-semibold mb-3">Table View</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-semibold text-gray-700"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {row.map((cell: any, cellIndex: number) => (
                      <td
                        key={cellIndex}
                        className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">JSON View</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </div>
      </>
    </div>
  );
}
