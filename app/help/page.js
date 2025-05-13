"use client"

import React, { useEffect } from 'react'
import Head from 'next/head';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';


const page = () => {
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
  }, [session, router])

  return (
    <>
      <div className="bg-gray-600 w-full h-1"></div>
      <Head>
        <title>Help | KeepKey</title>
      </Head>

      <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Need Help with <span className="text-red-500">KeepKey</span>?
          </h1>
          <p className="text-gray-600 text-md sm:text-lg max-w-2xl mx-auto">
            Find answers to common questions or contact our support team for more assistance.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 sm:p-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Frequently Asked Questions</h2>

          <div className="space-y-5">
            <div>
              <h3 className="font-bold text-gray-700">🔐 How do I save a password?</h3>
              <p className="text-gray-600">
                Go to the main page, enter your website URL, username, and password, then click "Save Password".
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-700">👁️ Can I view my saved passwords?</h3>
              <p className="text-gray-600">
                Yes, your passwords are hidden by default, but you can click the eye icon to reveal them before saving.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-700">✏️ How do I edit or delete a password?</h3>
              <p className="text-gray-600">
                Use the “Edit” or “Delete” buttons in the password list to modify or remove an entry.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-700">📱 Is KeepKey mobile-friendly?</h3>
              <p className="text-gray-600">
                Yes! The system is responsive and works on all screen sizes.
              </p>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="max-w-3xl mx-auto mt-12 bg-white shadow-md rounded-lg p-6 sm:p-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Still Need Help?</h2>
          <p className="text-gray-600 mb-6">
            If you didn’t find your answer above, feel free to contact us.
          </p>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <textarea
              placeholder="Describe your issue..."
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-semibold transition-all"
            >
              Submit Ticket
            </button>
          </form>
        </section>
      </div>
      <div className="bg-gray-600 w-full h-1"></div>
    </>
  )
}

export default page

