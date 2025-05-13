import React from 'react'
import Profile from '../../components/Profile'
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
    title:`${user.name} | Profile's`,
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
    <Profile />
  );
}

export default page;


  
