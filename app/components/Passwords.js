"use client"
import React, { useState, useEffect, useRef } from 'react'
import { FaLock } from "react-icons/fa";
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { submitForm, getForm, delForm } from '../actions/useractions';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import { MdContentCopy } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import Image from 'next/image'

const Passwords = () => {
    const { data: session, status } = useSession()
    const router = useRouter();
    const sectionPassword = useRef(null);

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
    }, [session, router])

    useEffect(() => {
        if (session) {
            getData();
        }
    }, [session])

    const [password, setPassword] = useState({ webUrl: "", userName: "", passWord: "", id: uuidv4() });
    const [passwordArray, setPasswordArray] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

    const getData = async () => {
        const daTa = await getForm(session.user.email);
        setPasswordArray(daTa);
    }

    const handleDelay = async (d) => {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, d * 1000);
        })
    }


    const handleChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    }

    const onSubmit = async () => {
        await submitForm(session.user.email, password);
        await handleDelay(3);
        setPassword({ webUrl: "", userName: "", passWord: "" });
        Swal.fire({
            title: "Saved Successfully!",
            icon: "success",
            draggable: true
        });
        await getData();
    }

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setPasswordArray(passwordArray.filter(item => item.id !== id));
                    await delForm(id);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    console.log("Deletion is failed:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong while deleting.",
                        icon: "error"
                    });
                }

            }
        });

    }

    const handleEdit = async (id) => {
        setPassword(passwordArray.filter(item => item.id === id)[0]);
        setPasswordArray(passwordArray.filter(item => item.id !== id));
        await delForm(id);
    }

    const handleCopy = (e) => {
        navigator.clipboard.writeText(e);
        toast.success('Copied to clipboard!', {
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

    const sectionToPassword = () => {
        sectionPassword.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <div className="bg-gray-600 w-full h-1"></div>

            {/* Form Section */}
            <form
                ref={sectionPassword}
                onSubmit={handleSubmit(onSubmit)}
                className="bg-[url('/loginimg.jpg')] bg-cover py-16 px-4 sm:px-8 flex items-center flex-col justify-center"
            >
                <div className="text-3xl sm:text-4xl font-bold flex items-center gap-x-2">
                    <div>
                        <span className="text-black">Keep</span>
                        <span className="text-red-500">Key</span>
                    </div>
                    <div>
                        <Image width={50} height={50} src="/logo.gif" alt="Logo"/>
                    </div>
                </div>

                <div className="font-bold text-center text-base sm:text-lg">
                    Your Own Password Manager
                </div>

                <div className="w-full flex flex-col gap-y-3 mt-12 max-w-4xl">
                    {/* Website URL */}
                    <div className="w-full px-4 sm:px-8">
                        <input
                            className="w-full bg-gray-200 focus:ring-2 focus:ring-gray-600 border-2 text-gray-700 font-bold py-2 px-4 rounded-2xl focus:outline-none focus:border-gray-200"
                            name="webUrl"
                            value={password.webUrl}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter a Website URL"
                        />
                    </div>

                    {/* Username + Password */}
                    <div className="flex flex-col md:flex-row gap-3 px-4 sm:px-8">
                        <input
                            className="w-full md:w-2/3 bg-gray-200 focus:ring-2 focus:ring-gray-600 border-gray-500 border-2 text-gray-700 font-bold py-2 px-4 rounded-2xl focus:outline-none focus:border-gray-200"
                            name="userName"
                            value={password.userName}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter a Username"
                        />

                        <div className="relative w-full md:w-1/3">
                            <input
                                className="bg-gray-200 focus:ring-2 focus:ring-gray-600 border-gray-500 border-2 text-gray-700 font-bold w-full py-2 px-4 rounded-2xl focus:outline-none focus:border-gray-200"
                                name="passWord"
                                value={password.passWord}
                                onChange={handleChange}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter a Password"
                            />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute bottom-[10px] right-3 text-gray-800 hover:scale-105 cursor-pointer text-2xl"
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="flex bg-slate-800 py-2 px-8 rounded-md text-md items-center gap-x-3 font-medium mt-6 cursor-pointer text-gray-200 transition-all duration-200 ease-in hover:bg-slate-900"
                >
                    <div>
                        {isSubmitting ? (
                            <div className="px-6">Loading...</div>
                        ) : (
                            <div className="flex items-center gap-x-3">
                                <span>
                                    <FaLock />
                                </span>
                                <span>Save Password</span>
                            </div>
                        )}
                    </div>
                </button>
            </form>

            <div className="bg-gray-600 w-full h-1"></div>

            {/* Password List Section */}
            <div className="w-full py-8 px-4 sm:px-8">
                <h2 className="text-xl font-bold text-center">
                    Your <span className="text-red-500">Passwords</span>
                </h2>

                <ul className="flex justify-center flex-col gap-y-4 items-center mt-12">
                    {passwordArray.length === 0 ? (
                        <div className="text-md text-gray-700">No Passwords to Display!</div>
                    ) : (
                        passwordArray.map((item, index) => (
                            <li
                                key={index}
                                className="bg-gray-200 w-full max-w-2xl p-6 flex flex-col gap-y-3 rounded-md"
                            >
                                <div className="bg-white w-7 h-7 flex justify-center items-center rounded-md font-bold text-gray-600">
                                    {index + 1}
                                </div>

                                <div className="flex sm:flex-row flex-col justify-between gap-x-2">
                                    <div className="font-bold">Website Url:</div>
                                    <a
                                        href={`https://${item.webUrl}`}
                                        target="_blank"
                                        className="text-slate-700 font-bold hover:text-blue-600 hover:underline break-words"
                                    >
                                        {item.webUrl}
                                    </a>
                                </div>

                                <div className="flex justify-between gap-x-2">
                                    <div className="font-bold">Username:</div>
                                    <div className="text-slate-700 font-bold flex gap-x-2 items-center break-words">
                                        <span
                                            onClick={() => handleCopy(item.userName)}
                                            className="cursor-pointer text-gray-600 hover:scale-110"
                                        >
                                            <MdContentCopy />
                                        </span>
                                        <span>{item.userName}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between gap-x-2">
                                    <div className="font-bold">Password:</div>
                                    <div className="text-slate-700 font-medium flex items-center gap-x-2">
                                        <span
                                            onClick={() => handleCopy(item.passWord)}
                                            className="cursor-pointer text-gray-600 hover:scale-110"
                                        >
                                            <MdContentCopy />
                                        </span>
                                        <span>{"*".repeat(item.passWord.length)}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center gap-x-2">
                                    <div className="font-bold">Actions:</div>
                                    <div className="inline-flex items-center rounded-md shadow-sm">
                                        <button
                                            onClick={() => {
                                                handleEdit(item.id);
                                                sectionToPassword();
                                            }}
                                            className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center cursor-pointer transition-all duration-200 ease-in"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM16.862 4.487L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                />
                                            </svg>
                                            <span className="hidden sm:inline-block">Edit</span>
                                        </button>

                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-slate-800 hover:text-red-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center cursor-pointer transition-all duration-200 ease-in"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                            <span className="hidden sm:inline-block">Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            <div className="bg-gray-600 w-full h-1"></div>
        </>

    )
}

export default Passwords
