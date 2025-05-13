import React from 'react'
import Passwords from '@/app/components/Passwords'
import User from '@/app/model/User'
import { notFound } from 'next/navigation'
import { handleDBConnection } from '@/app/Connection/ConnectionDB'

export async function generateMetadata({ params }) {
  const { username } = await params;

  await handleDBConnection();

  const user = await User.findOne({ username: username });
  if (!user) {
    return {
      title: "Not Found",
    }
  }

  return {
    title:`${user.name} | Passwords`,
  }


}

const page = async ({ params }) => {
  const { username } = await params;

  await handleDBConnection();

  const user = await User.findOne({ username: username });
  if (!user) {
    notFound();
  }

  return (
    <>
      <Passwords />
    </>
  )
}

export default page

