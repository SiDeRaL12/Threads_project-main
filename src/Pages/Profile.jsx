import React from 'react'
import UserProfilepic from '../components/UserProfilepic'
import UserName from '../components/UserName'

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-6">
            <div className="max-w-2xl mx-auto flex flex-col gap-6">
            <UserProfilepic size='large'/>
            <h1 className="text-2xl font-bold">Welcome, <UserName /></h1>

            </div>
    </div>
  )
}

export default Profile
