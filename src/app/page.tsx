import Image from "next/image"
import { readWarrantyCSV } from "@/data/warrenty"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getWarrantyCountAction } from "@/data/actions"
import WarrantyProductFields from "./WarrantyProductFields"
import { Suspense } from "react"
import WarrantyFormWithSuspense from "./WarrantyFormWithSuspense"
import GlobalSpinner from "./GlobalSpinner"

export default async function Home() {
  const warrantyData = (await readWarrantyCSV()) as Array<
    Record<string, string>
  >
  const count = (await getWarrantyCountAction()) + 1
  const warrantyNumberWith8Digits = count.toString().padStart(8, "0")
  return (
    <div className="font-sans min-h-screen p-8 pb-20 flex flex-col items-center justify-center bg-gray-50">
      <GlobalSpinner />
      <div className="flex flex-col items-center mb-8">
        <Image src="/logo.png" alt="Logo" width={220} height={220} priority />
        <h1 className="text-2xl font-bold mt-2">Warranty Registration</h1>
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-96">
            <span className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></span>
          </div>
        }
      >
        <WarrantyFormWithSuspense
          warrantyData={warrantyData}
          warrantyNumberWith8Digits={warrantyNumberWith8Digits}
        />
      </Suspense>
    </div>
  )
}
