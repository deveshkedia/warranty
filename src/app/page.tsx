import Image from "next/image"
import { readWarrantyCSV } from "@/data/warrenty"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getWarrantyCountAction, createWarrantyAction } from "@/data/actions"
import WarrantyProductFields from "./WarrantyProductFields"

export default async function Home() {
  const warrantyData = (await readWarrantyCSV()) as Array<
    Record<string, string>
  >
  const count = (await getWarrantyCountAction()) + 1
  const warrantyNumberWith8Digits = count.toString().padStart(8, "0")
  return (
    <div className="font-sans min-h-screen p-8 pb-20 flex items-center justify-center bg-gray-50">
      <form
        action={createWarrantyAction}
        className="bg-white p-8 rounded shadow w-full max-w-2xl"
      >
        <h2 className="text-lg font-bold mb-6 text-center">
          Register Warranty
        </h2>
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
        <h3 className="text-base font-semibold mb-2 mt-4">
          Application Details
        </h3>
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
    </div>
  )
}
