"use client"
export default function DownloadPDFButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.print()
      }}
      className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Download as PDF
    </button>
  )
}
