import fs from "fs"
import path from "path"
import { prisma } from "@/lib/db"
import { parse } from "csv-parse/sync"

// Path to the CSV file relative to the project root
const csvFilePath = path.join(
  process.cwd(),
  "src/data/Warranty Period - Sheet1.csv"
)

export async function readWarrantyCSV() {
  // console.log(csvFilePath)
  const fileContent = fs.readFileSync(csvFilePath, "utf-8")
  const records = parse(fileContent, {
    columns: true, // Set to true if you want to use the first row as keys
    skip_empty_lines: true,
  })
  // console.log(records)
  return records
}

export async function createFullWarrantyEntry(data: {
  customer: {
    customer_name: string
    customer_address: string
    customer_phone: string
    customer_email: string
    invoice_number: string
    date_purchase: Date | string
  }
  product: {
    name: string
    quantity: number
    warranty_period: string
    batch_number: string
    area_of_painting: string
  }
  application: {
    authorized_by: string
    primer_qty: string
    primer_used: string
    surface_value: string
  }
}) {
  // Create the Warranty entry first
  const warranty = await prisma.warranty.create({
    data: {},
  })

  // Create related Customer, Product, and Application entries
  await prisma.customer.create({
    data: {
      ...data.customer,
      warranty_id: warranty.id,
    },
  })
  await prisma.product.create({
    data: {
      ...data.product,
      warranty_id: warranty.id,
    },
  })
  await prisma.application.create({
    data: {
      ...data.application,
      warranty_id: warranty.id,
    },
  })

  return warranty
}

// For testing: run this file directly with `node warrenty.ts` (if compiled to JS)
if (require.main === module) {
  readWarrantyCSV()
}
