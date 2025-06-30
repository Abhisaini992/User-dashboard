import Link from 'next/link'

export default function UserCard({ user, onDelete }) {
  const handleDelete = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onDelete(user.id)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      {/* Profile Image or Initial */}
      <div className="flex items-center space-x-4 mb-4">
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600">
            {user.name[0].toUpperCase()}
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Extra Info */}
      <div className="text-sm text-gray-700 space-y-1 mb-4">
        <p>📞 {user.phone}</p>
        <p>👤 {user.gender}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center">
        <Link
          href={`/users/${user.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md text-sm"
        >
          View
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-100 hover:bg-red-200 text-red-700 py-1 px-3 rounded-md text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
