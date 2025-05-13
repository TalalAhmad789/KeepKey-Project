import React from 'react'
import EditProfile from '@/app/components/EditProfile'
import User from '@/app/model/User'
import { notFound } from 'next/navigation'
import { handleDBConnection } from '@/app/Connection/ConnectionDB'

export async function generateMetadata({ params }) {
    const { username } = await params;
    await handleDBConnection();

    const user = await User.findOne({ username: username });
    if (!user) {
        return {
            title: `Not Found` ,
        }
    }
    else{
        return {
            title: `${user.name} | Edit Profile's` ,
        }
    }

}

const Page = async ({ params }) => {
    const { username } = await params;
    await handleDBConnection();

    const user = await User.findOne({ username: username });
    if (!user) {
        notFound();
    }
    return (
        <EditProfile />
    )
}

export default Page

