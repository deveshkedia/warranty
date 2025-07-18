"use client"
import { useEffect } from "react"

declare global {
  interface Window {
    html2pdf?: Html2PdfStatic
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Html2PdfStatic extends Function {
    [key: string]: any
  }
}

export default function DownloadPDFButton({ targetId }: { targetId: string }) {
  useEffect(() => {
    // Load html2pdf.js from CDN if not already loaded
    if (!window.html2pdf) {
      const script = document.createElement("script")
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  function handleDownload() {
    const element = document.getElementById(targetId)
    if (element && window.html2pdf) {
      window.html2pdf().from(element).save("warranty.pdf")
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Download as PDF
    </button>
  )
}
