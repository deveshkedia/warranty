"use client"
import { useState } from "react"

interface WarrantyProductFieldsProps {
  warrantyData: Array<Record<string, string>>
}

export default function WarrantyProductFields({
  warrantyData,
}: WarrantyProductFieldsProps) {
  const [selectedProduct, setSelectedProduct] = useState("")
  const cleanProductName = (name: string) =>
    name.replace(/^\d+\.\s*/, "").replace(/\s*-\s*$/, "")

  const productOptions = Array.from(
    new Set(
      warrantyData
        .map((row) => row["Product Name"]?.trim())
        .filter((name) => name && name.length > 0)
        .map(cleanProductName)
    )
  )

  const selectedWarrantyPeriod =
    warrantyData.find(
      (row) =>
        cleanProductName(row["Product Name"]?.trim() || "") === selectedProduct
    )?.["Warranty Period"] || ""

  return (
    <>
      <h3 className="text-base font-semibold mb-2 mt-4">Product Details</h3>
      <table className="w-full border border-gray-300 mb-6">
        <tbody>
          <tr>
            <td className="font-medium pr-4 text-left align-middle border border-gray-300">
              Product Name
            </td>
            <td className="border border-gray-300">
              <select
                name="name"
                required
                className="border-none p-2 rounded w-full bg-white"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="" disabled>
                  Select Product Name
                </option>
                {productOptions.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td className="font-medium pr-4 text-left align-middle border border-gray-300">
              Warranty Period
            </td>
            <td className="border border-gray-300">
              <input
                name="warranty_period"
                placeholder="Warranty Period"
                required
                className="border-none p-2 rounded w-full bg-gray-100"
                value={selectedWarrantyPeriod}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium pr-4 text-left align-middle border border-gray-300">
              Batch Number
            </td>
            <td className="border border-gray-300">
              <input
                name="batch_number"
                placeholder="Batch Number"
                required
                className="border-none p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium pr-4 text-left align-middle border border-gray-300">
              Area of Painting
            </td>
            <td className="border border-gray-300">
              <input
                name="area_of_painting"
                placeholder="Area of Painting"
                required
                className="border-none p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium pr-4 text-left align-middle border border-gray-300">
              Quantity
            </td>
            <td className="border border-gray-300">
              <input
                name="quantity"
                type="number"
                placeholder="Quantity"
                required
                className="border-none p-2 rounded w-full"
                min={1}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
