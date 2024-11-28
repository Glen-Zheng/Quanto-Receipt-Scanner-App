"use client";

import React, { useState } from "react";
import Nav from "../../components/Nav";

interface LineItem {
  item_name: string;
  item_value: number;
}

interface Receipt {
  vendorName: string;
  lineItems: LineItem[];
  totalAmount: number;
}

export default function Home() {
  const [uploadedReceipts, setUploadedReceipts] = useState<Receipt[]>([]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/receipt", {
          // Removed trailing slash
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        const token = data.token;

        if (!response.ok) {
          throw new Error(data.error || "Failed to process receipt");
        }

        const delay = (ms: number) =>
          new Promise((resolve) => setTimeout(resolve, ms));
        await delay(4500);
        try {
          const response1 = await fetch("/api/read", {
            // Removed trailing slash
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });

          const data1 = await response1.json();

          if (response.ok) {
            console.log("API request raw data: ", data1);
            const receiptData = {
              vendorName: data1.result.establishment || " ",
              lineItems: data1.result.lineItems || "",
              totalAmount: data1.result.total || "",
            };
            console.log("here is your receipt's info: ", receiptData);

            setUploadedReceipts((prev) => [...prev, receiptData]);
          }
        } catch (error) {
          console.error("error", error);
        }
      } catch (error) {
        console.error("Error uploading receipt:", error);
        // Optionally, add user-friendly error handling
        alert(error instanceof Error ? error.message : "Upload failed");
      }
    }
  };

  return (
    <div className="flex flex-col">
      <Nav />
      <div className="flex h-screen">
        <div className="w-1/4 bg-gray-200 flex flex-col items-center justify-center p-4">
          <label
            htmlFor="file-upload"
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 cursor-pointer"
          >
            Upload Receipt!
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".jpg,.jpeg,.png"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>

        <div className="w-3/4 bg-white p-4 overflow-auto">
          <h1 className="text-2xl font-semibold text-center mb-4">
            Your Items
          </h1>
          {uploadedReceipts.length === 0 ? (
            <p className="text-center text-gray-500">
              No receipts uploaded yet.
            </p>
          ) : (
            <ul className="space-y-4">
              {uploadedReceipts.map((receipt, index) => (
                <li
                  key={index}
                  className="p-4 border rounded-md shadow-sm flex flex-col bg-gray-50"
                >
                  <h2 className="text-lg font-bold mb-2">
                    Vendor: {receipt.vendorName}
                  </h2>
                  <ul className="mb-2">
                    {receipt.lineItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex justify-between">
                        <span>{item.descClean}</span>
                        <span>${item.lineTotal || item.price}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-semibold text-right">
                    Total: ${receipt.totalAmount}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
