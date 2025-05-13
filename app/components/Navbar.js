"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from "next-auth/react"
import { fetchUser } from '../actions/useractions'
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Image from 'next/image'

const Navbar = () => {
    const { data: session, status } = useSession();
    const pathName = usePathname();
    const [showDropDown, setShowDropDown] = useState(false)
    const [hamburgerToggle, setHamburgerToggle] = useState(false)

    const handleDropDown = () => {
        setShowDropDown(!showDropDown);
    }

    const handleHamBurger = () => {
        setHamburgerToggle(!hamburgerToggle);
    }

    return (
        <>
            <div className='bg-white flex items-center justify-between py-3 px-6 sm:px-12'>
                <Link href={'/'} className='text-2xl font-bold flex items-center'><div><span className='text-black'>Keep</span><span className='text-red-500'>Key</span></div><div><Image unoptimized  height={35} width={35} src="/logo.gif" alt="logo" /></div></Link>
                {!session && pathName !== '/login' && <div className='lg:block hidden'>
                    <ul className='flex items-center gap-x-8 font-bold'>
                        <li className='cursor-pointer hover:scale-105'>How it works</li>
                        <li className='cursor-pointer hover:scale-105'>Personal</li>
                        <li className='cursor-pointer hover:scale-105'>Business</li>
                        <li className='cursor-pointer hover:scale-105'>Pricing</li>
                        <li className='cursor-pointer hover:scale-105'>Support</li>
                        <li className='cursor-pointer hover:scale-105'>Contact us</li>
                    </ul>
                </div>}
                {pathName !== '/login' && !session ?
                    <Link className='lg:block hidden' href={'/login'}><button type="button" className="text-red-500 hover:text-white border border-red-500 hover:bg-red-500 focus:ring-3 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-sm px-8 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-500 cursor-pointer transition-all duration-200 ease-in">Get Free</button></Link>
                    : <div></div>}
                {pathName !== '/login' && !session ?
                    hamburgerToggle ? <RxCross2 onClick={() => handleHamBurger()} className='lg:hidden cursor-pointer block text-xl text-gray-600' /> : <FaBars onClick={() => handleHamBurger()} className='lg:hidden cursor-pointer block text-xl text-gray-600' />
                    : <div></div>}
                {session && <>
                    <button onBlur={() => setTimeout(() => {
                        setShowDropDown(!showDropDown)
                    }, 300)}>
                        <Image onClick={() => handleDropDown()}
                            width={100}
                            height={100}
                            alt="tania andrew"
                            src={'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'}
                            className="relative inline-block h-10 w-10 cursor-pointer rounded-full object-cover object-center border-2 border-gray-500"
                            data-popover-target="profile-menu"
                        />
                    </button>
                    <ul
                        role="menu"
                        data-popover="profile-menu"
                        data-popover-placement="bottom"
                        className={`absolute right-3 top-18 z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm focus:outline-none transform-opacity duration-200 ease-in ${showDropDown ? "" : "hidden"} ${showDropDown ? 'opacity-100 visible' : 'opacity-0 invisible'
                            }`}
                    >
                        <Link href={`/profile/${session.user.name}`}
                            role="menuitem"
                            className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
                                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
                            </svg>

                            <p className="text-slate-800 font-medium ml-2">
                                My Profile
                            </p>
                        </Link>
                        <Link href={`/editprofile/${session.user.name}`}
                            role="menuitem"
                            className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
                                <path fillRule="evenodd" d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                            </svg>

                            <p className="text-slate-800 font-medium ml-2">
                                Edit Profile
                            </p>
                        </Link>
                        <Link href={`/passwords/${session.user.name}`} role="menuitem"
                            className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
                                <path fillRule="evenodd" d="M1 11.27c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 0 1 5.273 3h9.454a2.75 2.75 0 0 1 2.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3.73Zm3.068-5.852A1.25 1.25 0 0 1 5.273 4.5h9.454a1.25 1.25 0 0 1 1.205.918l1.523 5.52c.006.02.01.041.015.062H14a1 1 0 0 0-.86.49l-.606 1.02a1 1 0 0 1-.86.49H8.236a1 1 0 0 1-.894-.553l-.448-.894A1 1 0 0 0 6 11H2.53l.015-.062 1.523-5.52Z" clipRule="evenodd" />
                            </svg>

                            <p className="text-slate-800 font-medium ml-2">
                                Your Passwords
                            </p>
                        </Link>
                        <Link href={'/help'}
                            role="menuitem"
                            className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
                                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                            </svg>

                            <p className="text-slate-800 font-medium ml-2">
                                Help
                            </p>
                        </Link>
                        <hr className="my-2 border-slate-200" role="menuitem" />
                        <li onClick={() => signOut()}
                            role="menuitem"
                            className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
                                <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z" clipRule="evenodd" />
                            </svg>

                            <p className="text-slate-800 font-medium ml-2">
                                Sign Out
                            </p>
                        </li>
                    </ul></>}


            </div>

            {/* Responsice Links */}
            <div className={`bg-gray-100 overflow-hidden transition-all duration-500 ease-in
    ${hamburgerToggle ? 'max-h-[500px]' : 'max-h-0'}`}>

                {!session && pathName !== '/login' && (
                    <div className='lg:hidden block'>
                        <ul className='flex flex-col font-bold text-slate-900'>
                            <li className='cursor-pointer hover:scale-105 w-full text-center py-2'>How it works</li>
                            <li className='cursor-pointer hover:scale-105 w-full text-center py-2'>Personal</li>
                            <li className='cursor-pointer hover:scale-105 w-full text-center py-2'>Business</li>
                            <li className='cursor-pointer hover:scale-105 w-full text-center py-2'>Pricing</li>
                            <li className='cursor-pointer hover:scale-105 w-full text-center py-2'>Support</li>
                            <li className='cursor-pointer hover:scale-105 w-full text-center py-2'>Contact us</li>
                        </ul>
                    </div>
                )}

                {pathName !== '/login' && !session ? (
                    <Link className='lg:hidden block' href='/login'>
                        <button
                            type="button"
                            className="text-slate-900 bg-red-500 font-bold text-sm px-8 py-2 text-center cursor-pointer transition-all duration-200 ease-in w-full hover:scale-105 hover:text-gray-200"
                        >
                            Get Free
                        </button>
                    </Link>
                ) : <div></div>}
            </div>

        </>
    )
}

export default Navbar
