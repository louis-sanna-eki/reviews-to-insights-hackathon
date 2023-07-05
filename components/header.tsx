'use client'
import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="flex justify-around p-6 bg-blue-600 text-white shadow-lg">
      <Link href="/">
        <div
          className={`p-2 px-4 cursor-pointer rounded transition-colors duration-200 ease-in-out ${
            pathname === '/'
              ? 'bg-white text-blue-600'
              : 'hover:bg-blue-500 hover:text-white'
          }`}
        >
          Home
        </div>
      </Link>
      <Link href="/reviews">
        <div
          className={`p-2 px-4 cursor-pointer rounded transition-colors duration-200 ease-in-out ${
            pathname === '/reviews'
              ? 'bg-white text-blue-600'
              : 'hover:bg-blue-500 hover:text-white'
          }`}
        >
          Reviews
        </div>
      </Link>
      <Link href="/about">
        <div
          className={`p-2 px-4 cursor-pointer rounded transition-colors duration-200 ease-in-out ${
            pathname === '/about'
              ? 'bg-white text-blue-600'
              : 'hover:bg-blue-500 hover:text-white'
          }`}
        >
          About
        </div>
      </Link>
    </header>
  )
}
