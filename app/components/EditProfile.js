"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { fetchUser, updateProfile } from '../actions/useractions'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';


const EditProfile = () => {
    const { data: session, status } = useSession()
    const router = useRouter();

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
    }, [session, router, status])

    useEffect(() => {
        getData();
    }, [session])

    const handleDelay = async (d) => {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, d * 1000);
        })
    }

    const [form, setForm] = useState({ firName: "", lastName: "", tagline: "", city: "", country: "", about: ""});
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

    const getData = async () => {
        if (!session || !session.user) return;
        let res = await fetchUser(session.user.email);
        setForm({
            firName: res.firName || "",
            lastName: res.lastName || "",
            tagline: res.tagline || "",
            city: res.city || "",
            country: res.country || "",
            about: res.about || "",
        })
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        const res = await updateProfile(form, session.user.email);
        if (res?.error) {
            await handleDelay(3);
            Swal.fire({
                title: res.error,
                icon: "error",
                draggable: true
            });
            await getData();
        }
        await handleDelay(3);
        Swal.fire({
            title: "Update Successfully!",
            icon: "success",
            draggable: true
        });
        await getData();
    }

    return (
        <>

            <div className="bg-gray-600 w-full h-1"></div>

            <div className="py-16 bg-[url('/loginimg.jpg')]">
                <h2 className='text-center text-2xl font-bold text-gray-800'>Profile Information Update</h2>
                <div className='flex justify-center items-center mt-4'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center gap-y-2 w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] xl:w-[35vw] bg-slate-300 p-4 rounded-sm'>
                        <input onChange={handleChange} className='w-full bg-gray-200 focus:ring-2 focus:ring-gray-600  border-2 text-gray-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:border-gray-200' type="text" placeholder='Enter first name' name='firName' value={form.firName} />
                        <input onChange={handleChange} className='w-full bg-gray-200 focus:ring-2 focus:ring-gray-600  border-2 text-gray-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:border-gray-200' type="text" placeholder='Enter last name' name='lastName' value={form.lastName} />
                        <input onChange={handleChange} className='w-full bg-gray-200 focus:ring-2 focus:ring-gray-600  border-2 text-gray-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:border-gray-200' type="text" placeholder='Enter tagline' name='tagline' value={form.tagline} />
                        <input onChange={handleChange} className='w-full bg-gray-200 focus:ring-2 focus:ring-gray-600  border-2 text-gray-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:border-gray-200' type="text" placeholder='Enter your city' name='city' value={form.city} />
                        <input onChange={handleChange} className='w-full bg-gray-200 focus:ring-2 focus:ring-gray-600  border-2 text-gray-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:border-gray-200' type="text" placeholder='Enter your country' name='country' value={form.country} />
                        <textarea onChange={handleChange} rows={3} className='w-full bg-gray-200 focus:ring-2 focus:ring-gray-600  border-2 text-gray-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:border-gray-200 resize-none' name="about" placeholder='About you' id="" value={form.about}></textarea>
                        <button disabled={isSubmitting} type='submit' className='flex bg-slate-800 py-2 px-8 rounded-md text-md items-center gap-x-3 font-medium cursor-pointer text-gray-200 transition-all duration-200 ease-in hover:bg-slate-900'><div>{isSubmitting ? <div className='px-6'>Loading...</div> : <div className='flex items-center gap-x-3'>Update</div>}</div></button>
                    </form>
                </div>
            </div>

            <div className="bg-gray-600 w-full h-1"></div>

        </>
    )
}

export default EditProfile
