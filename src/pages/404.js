
import Link from "next/link"
import { HardHat, ArrowLeft, Construction, Home,CircleX  } from "lucide-react"

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-3xl w-full text-center">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Purple header bar */}
          <div className="bg-headupb2b p-6 flex justify-center">
            <CircleX className="text-white h-16 w-16" />
          </div>

          <div className="p-8">
            <h1 className="text-4xl md:text-6xl font-bold text-headupb2b mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              Construction Zone - Page Not Found
            </h2>

            <div className="flex justify-center mb-8">
              <Construction className="text-headupb2b h-20 w-20" />
            </div>

            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Sorry, the page you're looking for either has been removed or there is no such page. Please check the URL or
              navigate back to our website.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-headupb2b text-white px-6 py-3 rounded-md hover:bg-[#4A3A70] transition-colors"
              >
                <Home className="h-5 w-5" />
                Back to Home
              </Link>
            </div>
          </div>

          {/* Footer with construction tape design */}
          <div
            className="h-8 bg-gradient-to-r from-yellow-400 to-headupb2b bg-[length:20px_20px] bg-repeat-x"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, #5D4A8C, #5D4A8C 10px, #F6E05E 10px, #F6E05E 20px)",
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

