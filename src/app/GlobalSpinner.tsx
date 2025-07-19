"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function GlobalSpinner() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const start = () => setLoading(true)
    const end = () => setLoading(false)
    router.events?.on("routeChangeStart", start)
    router.events?.on("routeChangeComplete", end)
    router.events?.on("routeChangeError", end)
    return () => {
      router.events?.off("routeChangeStart", start)
      router.events?.off("routeChangeComplete", end)
      router.events?.off("routeChangeError", end)
    }
  }, [router])

  if (!loading) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
      <span className="loader border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16 animate-spin"></span>
    </div>
  )
}
