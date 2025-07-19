"use client"
import { useState } from "react"
import WarrantyProductFields from "./WarrantyProductFields"
import { createWarrantyAction } from "@/data/actions"

export default function WarrantyFormWithSuspense({
  warrantyData,
  warrantyNumberWith8Digits,
}: {
  warrantyData: Array<Record<string, string>>
  warrantyNumberWith8Digits: string
}) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    await createWarrantyAction(formData)
  }

  return (
    <form
      action={handleSubmit}
      className="bg-white p-8 rounded shadow w-full max-w-2xl"
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
          <span className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></span>
        </div>
      )}
      <h2 className="text-lg font-bold mb-6 text-center">Register Warranty</h2>
      <h3 className="text-base font-semibold mb-2 mt-4">Customer Details</h3>
      <table className="w-full border border-gray-300 mb-6">
        <tbody>
          <tr>
            <td className="font-medium pr-4 text-left align-middle border border-gray-300">
              Warranty Number
            </td>
            <td className="border border-gray-300">
              <input
                name="warranty_number"
                placeholder="Warranty Number"
                required
                className="border-none p-2 rounded w-full"
                readOnly
                value={warrantyNumberWith8Digits}
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium pr-4 text-left align-middle border border-gray-300">
              Customer Name
            </td>
            <td className="border border-gray-300">
              <input
                name="customer_name"
                placeholder="Customer Name"
                required
                className="border-none p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium pr-4 text-left align-middle border border-gray-300">
              Address
            </td>
            <td className="border border-gray-300">
              <textarea
                name="customer_address"
                placeholder="Customer Address"
                required
                className="border-none p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium pr-4 text-left align-middle border border-gray-300">
              Phone
            </td>
            <td className="border border-gray-300">
              <input
                name="customer_phone"
                placeholder="Customer Phone"
                required
                className="border-none p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium pr-4 text-left align-middle border border-gray-300">
              Email
            </td>
            <td className="border border-gray-300">
              <input
                name="customer_email"
                placeholder="Customer Email"
                type="email"
                required
                className="border-none p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium pr-4 text-left align-middle border border-gray-300">
              Invoice Number
            </td>
            <td className="border border-gray-300">
              <input
                name="invoice_number"
                placeholder="Invoice Number"
                required
                className="border-none p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium pr-4 text-left align-middle border border-gray-300">
              Date of Purchase
            </td>
            <td className="border border-gray-300">
              <input
                name="date_purchase"
                placeholder="Date of Purchase"
                type="date"
                required
                className="border-none p-2 rounded w-full"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <WarrantyProductFields warrantyData={warrantyData} />
      <h3 className="text-base font-semibold mb-2 mt-4">Application Details</h3>
      <table className="w-full border border-gray-300 mb-6">
        <tbody>
          <tr>
            <td className="font-medium pr-4 text-left align-middle border border-gray-300">
              Authorized By
            </td>
            <td className="border border-gray-300">
              <input
                name="authorized_by"
                placeholder="Authorized By"
                required
                className="border-none p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium pr-4 text-left align-middle border border-gray-300">
              Primer Quantity
            </td>
            <td className="border border-gray-300">
              <input
                name="primer_qty"
                placeholder="Primer Quantity"
                required
                className="border-none p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium pr-4 text-left align-middle border border-gray-300">
              Primer Used
            </td>
            <td className="border border-gray-300">
              <input
                name="primer_used"
                placeholder="Primer Used"
                required
                className="border-none p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium pr-4 text-left align-middle border border-gray-300">
              Surface Value
            </td>
            <td className="border border-gray-300">
              <input
                name="surface_value"
                placeholder="Surface Value"
                required
                className="border-none p-2 rounded w-full"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button
        type="submit"
        className="bg-black text-white rounded p-2 mt-6 w-full"
      >
        Submit
      </button>
    </form>
  )
}
