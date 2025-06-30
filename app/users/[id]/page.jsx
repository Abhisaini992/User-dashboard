'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function UserDetail({ params }) {
  const router = useRouter()
  const userId = params.id

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})

  
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find(u => u.id === userId)
    if (found) {
      setUser(found)
      setEditData(found)
    }
    setLoading(false)
  }, [userId])

  
  const handleEdit = () => setIsEditing(true)

  
  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const updated = users.map(u => u.id === userId ? { ...editData, id: userId } : u)
    localStorage.setItem('users', JSON.stringify(updated))
    setUser(editData)
    setIsEditing(false)
  }

  
  const handleCancel = () => {
    setEditData(user)
    setIsEditing(false)
  }

  
  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?')
    if (confirmDelete) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const remaining = users.filter(u => u.id !== userId)
      localStorage.setItem('users', JSON.stringify(remaining))
      router.push('/users')
    }
  }

  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-center text-gray-600">Loading user details...</p>
        </main>
        <Footer />
      </div>
    )
  }

  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">User Not Found</h1>
            <p className="text-gray-600 mb-6">This user doesn't exist.</p>
            <button
              onClick={() => router.push('/users')}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Back to User List
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-blue-700 text-white p-6 flex items-center space-x-6">
              {user.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-white text-blue-700 flex items-center justify-center font-bold text-2xl">
                  {user.name.charAt(0)}
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p>{user.email}</p>
                <p>{user.phone}</p>
              </div>
            </div>

            <div className="p-6">
              {isEditing ? (
                <div className="space-y-4">
                  {/* Name */}
                  <input
                    type="text"
                    value={editData.name}
                    onChange={e => setEditData({ ...editData, name: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Name"
                  />
                  {/* Email */}
                  <input
                    type="email"
                    value={editData.email}
                    onChange={e => setEditData({ ...editData, email: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Email"
                  />
                  {/* Phone */}
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={e => setEditData({ ...editData, phone: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Phone"
                  />
                  {/* Gender */}
                  <select
                    value={editData.gender}
                    onChange={e => setEditData({ ...editData, gender: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {/* Address */}
                  <textarea
                    value={editData.address}
                    onChange={e => setEditData({ ...editData, address: e.target.value })}
                    rows={3}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Address"
                  />

                  {/* Save / Cancel */}
                  <div className="flex space-x-4">
                    <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">
                      Save
                    </button>
                    <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Gender:</strong> {user.gender}</p>
                  <p><strong>Address:</strong> {user.address}</p>
                  <p><strong>Registered:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

                  {/* Edit / Delete / Back */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    <button onClick={handleEdit} className="bg-blue-600 text-white px-4 py-2 rounded">
                      Edit
                    </button>
                    <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
                      Delete
                    </button>
                    <button onClick={() => router.push('/users')} className="bg-gray-500 text-white px-4 py-2 rounded">
                      Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
