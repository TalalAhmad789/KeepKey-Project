"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const page = () => {
  const { data: session, status } = useSession()
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (session) {
      router.push(`/profile/${session.user.name}`);
    }
  }, [session, router])

  if (status === 'loading' || isAuthenticating) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className='loader'></div>
      </div>
    );
  }

  const handleProvider = async (provider) => {
    setIsAuthenticating(true);
    await signIn(provider)
  }

  return (
    <>
      <div className='bg-gray-600 w-full h-1'></div>

      <div className="bg-[url('/loginimg.jpg')] bg-cover bg-center py-24 min-h-screen flex justify-center items-center">
        <div className='bg-gray-100 w-full max-w-md border-2 border-gray-600 p-6 rounded-md mx-4 shadow-lg'>
          <div className='text-2xl font-bold flex justify-center items-center gap-2'>
            <div><span className='text-black'>Keep</span><span className='text-red-500'>Key</span></div>
            <Image width={35} height={35} src="/logo.gif" alt="Logo" />
          </div>

          <h2 className='text-center font-bold text-lg mt-4'>Sign in to KeepKey</h2>
          <p className='text-center text-sm mt-2 font-bold text-gray-600'>Welcome back! Please sign in to continue</p>

          <div className='flex flex-col items-center gap-y-3 mt-10'>
            <button onClick={() => handleProvider('google')}
              className="cursor-pointer flex items-center bg-white border border-gray-300 rounded-lg shadow-md w-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none gap-x-2 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200">
              <Image width={25} height={25} src="/icons8-google.svg" alt="goo" />
              <span>Continue with Google</span>
            </button>

            <button onClick={() => handleProvider('github')}
              className="cursor-pointer flex items-center bg-white border border-gray-300 rounded-lg shadow-md w-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none gap-x-2 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200">
              <Image width={25} height={25} src="/icons8-github.svg" alt="git" />
              <span>Continue with GitHub</span>
            </button>
          </div>
        </div>
      </div>

      <div className='bg-gray-600 w-full h-1'></div>
    </>
  )
}

export default page


