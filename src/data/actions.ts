"use server"

import { z } from "zod"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
// const schema = z.object({
//   email: z.string({
//     invalid_type_error: "Invalid Email",
//   }),
// })

export async function createWarrantyAction(formData: FormData) {
  "use server"
  // 1. Create Warranty
  const warranty = await prisma.warranty.create({ data: {} })

  // 2. Create Customer
  await prisma.customer.create({
    data: {
      customer_name: String(formData.get("customer_name")),
      customer_address: String(formData.get("customer_address")),
      customer_phone: String(formData.get("customer_phone")),
      customer_email: String(formData.get("customer_email")),
      invoice_number: String(formData.get("invoice_number")),
      date_purchase: new Date(String(formData.get("date_purchase"))),
      warranty_id: warranty.id,
    },
  })

  // 3. Create Product
  await prisma.product.create({
    data: {
      name: String(formData.get("name")),
      warranty_period: String(formData.get("warranty_period")),
      batch_number: String(formData.get("batch_number")),
      area_of_painting: String(formData.get("area_of_painting")),
      quantity: Number(formData.get("quantity")),
      warranty_id: warranty.id,
    },
  })

  // 4. Create Application
  await prisma.application.create({
    data: {
      authorized_by: String(formData.get("authorized_by")),
      primer_qty: String(formData.get("primer_qty")),
      primer_used: String(formData.get("primer_used")),
      surface_value: String(formData.get("surface_value")),
      warranty_id: warranty.id,
    },
  })

  // Redirect to /success page with warranty id
  return redirect(`/success?warrantyId=${warranty.id}`)
}
