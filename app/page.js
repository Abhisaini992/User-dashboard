'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'

export default function Home() {
  const router = useRouter()

  // User count ko store karne ke liye state
  const [userCount, setUserCount] = useState(0)

  // Page load hote hi user count nikalna (localStorage se)
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    setUserCount(savedUsers.length)
  }, [])

  // Button click pe registration page pe jao
  const handleRegisterClick = () => {
    router.push('/register')
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Banner Image ya Heading Section */}
        <Banner />

        {/* Welcome Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome to User Management System
          </h2>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Yahan aap naye users register kar sakte hain, sabhi users dekh sakte hain,
            aur unka data manage kar sakte hain — sab kuch ek hi jagah pe.
          </p>

          {/* User Count Box */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Current Statistics
            </h3>
            <p className="text-3xl font-bold text-blue-600">{userCount}</p>
            <p className="text-blue-700">Registered Users</p>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegisterClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register New User
          </button>
        </section>
      </main>

      {/* Footer at Bottom */}
      <Footer />
    </div>
  )
}
