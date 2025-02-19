import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-800 p-4 text-center">
      <div className="container mx-auto">
        <Link href="/contact" className="text-white hover:text-gray-300 mr-4">
          Contact Me
        </Link>
        <span className="text-gray-400">© {new Date().getFullYear()} Game & Editor. All rights reserved.</span>
      </div>
    </footer>
  )
}

