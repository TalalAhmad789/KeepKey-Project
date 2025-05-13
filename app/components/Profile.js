"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchUser } from '../actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image'


const Profile = () => {
  const { data: session, status } = useSession()
  const router = useRouter();

  const [form, setForm] = useState({
    firName: "",
    lastName: "",
    tagline: "",
    city: "",
    country: "",
    about: "",
  });

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push('/');
      toast.success('Logout Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [session, router]);

  useEffect(() => {
    getData();
  }, [session]);

  const getData = async () => {
    if (!session?.user) return;
    const res = await fetchUser(session.user.email);
    setForm({
      firName: res.firName || "",
      lastName: res.lastName || "",
      tagline: res.tagline || "",
      city: res.city || "",
      country: res.country || "",
      about: res.about || "",
    });
  }

  return (
    <>
      <div className="bg-gray-600 w-full h-1"></div>

      <div className="bg-[url('/loginimg.jpg')] bg-cover bg-center py-24 sm:py-32 w-full min-h-screen flex justify-center items-center px-4">
        <div className="flex flex-col items-center border-2 border-gray-600 bg-gray-100 w-full max-w-3xl rounded-3xl pt-24 px-6 sm:px-12">
          <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-full overflow-hidden -mt-40 bg-white shadow-[0px_3px_20px_0px_#9e9e9d]">
            <Image priority loading="eager" width={100} height={100}
              className="w-full h-full object-cover object-center"
              src={'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'}
              alt="Profile"
            />
          </div>
          <div className="mt-4 text-slate-800 text-2xl sm:text-4xl font-semibold text-center">
            {session?.user?.name}
          </div>
          <div className="text-sm sm:text-lg font-bold mt-2 text-gray-600 text-center">
            {form.city || "City"}, {form.country || "Country"}
          </div>
          <div className="text-xs sm:text-sm font-bold mt-1 text-gray-600 text-center">
            {form.tagline || "@tagline"}
          </div>
          <p className="w-full sm:w-4/5 text-center text-sm leading-5 font-bold mt-6 mb-6 text-gray-500">
            {form.about || "Description"}
          </p>
        </div>
      </div>

      <div className="bg-gray-600 w-full h-1"></div>
    </>
  )
}

export default Profile
