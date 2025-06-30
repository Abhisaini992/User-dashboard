'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import UserCard from '@/components/UserCard'

export default function UserList() {
  const router = useRouter()

  // Sabhi users ka data rakhta hai
  const [users, setUsers] = useState([])

  // Filtered (search + gender ke according) user list
  const [filteredUsers, setFilteredUsers] = useState([])

  // Search input ka state
  const [searchTerm, setSearchTerm] = useState('')

  // Gender filter ka state
  const [genderFilter, setGenderFilter] = useState('')

  // Data load hone tak loading dikhane ke liye
  const [loading, setLoading] = useState(true)

  // Pehli baar component load hone par data localStorage se fetch karo
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    setUsers(savedUsers)
    setFilteredUsers(savedUsers)
    setLoading(false)
  }, [])

  // Jab searchTerm ya genderFilter ya users change ho to filter apply karo
  useEffect(() => {
    let updatedList = [...users]

    // Agar search likha ho to uske hisaab se filter karo
    if (searchTerm) {
      updatedList = updatedList.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Agar gender filter laga ho to use bhi apply karo
    if (genderFilter) {
      updatedList = updatedList.filter(user => user.gender === genderFilter)
    }

    setFilteredUsers(updatedList)
  }, [users, searchTerm, genderFilter])

  // Delete button pe click hone par user delete karo
  const handleDeleteUser = (userId) => {
    const confirmDelete = confirm('Are you sure you want to delete this user?')
    if (confirmDelete) {
      const updatedUsers = users.filter(user => user.id !== userId)
      setUsers(updatedUsers)
      localStorage.setItem('users', JSON.stringify(updatedUsers))
    }
  }

  // Jab tak data load ho raha ho tab loading screen dikhao
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading users...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Main UI
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Title and Add User Button */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                User List ({filteredUsers.length})
              </h1>
              <button
                onClick={() => router.push('/register')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              >
                Add New User
              </button>
            </div>

            {/* Search and Gender Filter */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Search Box */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Users</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name or email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Gender Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Gender</label>
                  <select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Agar koi user nahi mila */}
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {users.length === 0 ? 'No Users Found' : 'No Matching Users'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {users.length === 0
                    ? 'Start by adding your first user.'
                    : 'Try changing search or filter.'}
                </p>
                {users.length === 0 && (
                  <button
                    onClick={() => router.push('/register')}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                  >
                    Register First User
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onDelete={handleDeleteUser}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
