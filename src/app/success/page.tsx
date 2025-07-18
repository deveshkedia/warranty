import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import WarrantyText from "./warranty_text"
import { readWarrantyCSV } from "@/data/warrenty"
// import DownloadPDFButton from "./DownloadPDFButton"

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SuccessPage({ searchParams }: Props) {
  const { warrantyId } = await searchParams
  if (!warrantyId) return notFound()

  // Fetch the warranty and related data
  const warranty = await prisma.warranty.findUnique({
    where: { id: Number(warrantyId) },
    include: {
      customer: true,
      product: true,
      application: true,
    },
  })
  if (
    !warranty ||
    !warranty.customer ||
    !warranty.product ||
    !warranty.application
  )
    return notFound()

  const warrantyData = (await readWarrantyCSV()) as Array<
    Record<string, string>
  >
  const warrantyProduct = warrantyData.find((row) =>
    row["Product Name"]
      ?.toLowerCase()
      .includes(warranty.product!.name?.trim().toLowerCase() || "")
  )
  if (!warrantyProduct) return notFound()

  return (
    <div className="font-sans min-h-screen p-8 pb-20 flex flex-col items-center justify-center bg-gray-50">
      {/* <DownloadPDFButton targetId="warranty-content" /> */}
      <div
        id="warranty-content"
        className="bg-white p-8 rounded shadow w-full max-w-2xl mb-8"
      >
        <h2 className="text-lg font-bold mb-6 text-center">
          Warranty Registration Details
        </h2>
        <h3 className="text-base font-semibold mb-2 mt-4">Customer Details</h3>
        <table className="w-full border border-gray-300 mb-6">
          <tbody>
            <tr>
              <td className="font-medium pr-4 text-left align-middle border border-gray-300">
                Customer Name
              </td>
              <td className="border border-gray-300">
                {warranty.customer.customer_name}
              </td>
            </tr>
            <tr>
              <td className="font-medium pr-4 text-left align-middle border border-gray-300">
                Address
              </td>
              <td className="border border-gray-300">
                {warranty.customer.customer_address}
              </td>
            </tr>
            <tr>
              <td className="font-medium pr-4 text-left align-middle border border-gray-300">
                Phone
              </td>
              <td className="border border-gray-300">
                {warranty.customer.customer_phone}
              </td>
            </tr>
            <tr>
              <td className="font-medium pr-4 text-left align-middle border border-gray-300">
                Email
              </td>
              <td className="border border-gray-300">
                {warranty.customer.customer_email}
              </td>
            </tr>
            <tr>
              <td className="font-medium pr-4 text-left align-middle border border-gray-300">
                Invoice Number
              </td>
              <td className="border border-gray-300">
                {warranty.customer.invoice_number}
              </td>
            </tr>
            <tr>
              <td className="font-medium pr-4 text-left align-middle border border-gray-300">
                Date of Purchase
              </td>
              <td className="border border-gray-300">
                {warranty.customer.date_purchase.toLocaleDateString()}
              </td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-base font-semibold mb-2 mt-4">Product Details</h3>
        <table className="w-full border border-gray-300 mb-6">
          <tbody>
            <tr>
              <td className="font-medium pr-4 text-left align-middle border border-gray-300">
                Product Name
              </td>
              <td className="border border-gray-300">
                {warranty.product.name}
              </td>
            </tr>
            <tr>
              <td className="font-medium pr-4 text-left align-middle border border-gray-300">
                Quantity
              </td>
              <td className="border border-gray-300">
                {warranty.product.quantity}
              </td>
            </tr>
            <tr>
              <td className="font-medium pr-4 text-left align-middle border border-gray-300">
                Warranty Period
              </td>
              <td className="border border-gray-300">
                {warranty.product.warranty_period}
              </td>
            </tr>
            <tr>
              <td className="font-medium pr-4 text-left align-middle border border-gray-300">
                Batch Number
              </td>
              <td className="border border-gray-300">
                {warranty.product.batch_number}
              </td>
            </tr>
            <tr>
              <td className="font-medium pr-4 text-left align-middle border border-gray-300">
                Area of Painting
              </td>
              <td className="border border-gray-300">
                {warranty.product.area_of_painting}
              </td>
            </tr>
          </tbody>
        </table>
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
                {warranty.application.authorized_by}
              </td>
            </tr>
            <tr>
              <td className="font-medium pr-4 text-left align-middle border border-gray-300">
                Primer Quantity
              </td>
              <td className="border border-gray-300">
                {warranty.application.primer_qty}
              </td>
            </tr>
            <tr>
              <td className="font-medium pr-4 text-left align-middle border border-gray-300">
                Primer Used
              </td>
              <td className="border border-gray-300">
                {warranty.application.primer_used}
              </td>
            </tr>
            <tr>
              <td className="font-medium pr-4 text-left align-middle border border-gray-300">
                Surface Value
              </td>
              <td className="border border-gray-300">
                {warranty.application.surface_value}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Warranty Information
        </h2>
        <WarrantyText warrantyProduct={warrantyProduct} />
      </div>
    </div>
  )
}
