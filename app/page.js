import Link from "next/link";
import Image from 'next/image'

export default function Home() {
  return (
    <>


      <div className="bg-[url('/backgroundimg.jpg')] bg-cover bg-center w-full h-full text-white flex justify-center items-center flex-col py-20">
        <h1 className="text-2xl md:mx-0 mx-2 text-center md:text-4xl font-bold">The Best Free Password Manager</h1>
        <p className="mx-8 text-sm md:mx-[30vw] mt-6 text-center font-medium">Solve poor password habits easily and quickly, so you can secure every account with one, simple login.</p>
        <Link href={'/login'}>
          <button className="bg-red-600 text-lg py-2 px-10 cursor-pointer mt-4 rounded-md hover:bg-red-700 transition-all duration-200 ease-in">Get Free</button>
        </Link>
      </div>

      <div className='bg-gray-600 w-full h-1'></div>

      <div className="py-12">
        <h2 className="text-center font-bold text-2xl text-gray-800">More than just Passwords</h2>
        <div className="flex lg:flex-row gap-y-4 lg:gap-y-0 flex-col justify-between items-center mx-2 sm:mx-24 lg:mx-36 mt-8">

          <div className="lg:w-[20vw] w-full flex flex-col gap-y-3 justify-center items-center p-4 border-4 border-red-500 text-center">
            <Image width={70} height={70} unoptimized src="/file-gif.gif" alt="icon1" />
            <div className="font-bold">Store personal information</div>
            <p className="text-sm text-center text-gray-800">Consider your most valuable documents - passport, credit cards, social security, etc. With KeepKey, you can create a Secure Note for each and store all the relevant information.</p>
          </div>
          <div className="lg:w-[20vw] w-full flex flex-col gap-y-3 justify-center items-center p-4 border-4 border-red-500 text-center">
            <Image width={70} height={70} unoptimized src="/form.gif" alt="icon2" />
            <div className="font-bold">Fill in online forms</div>
            <p className="text-sm text-center text-gray-800">No need to enter your address or credit card information every time you take a purchase. All of this can be securely stored in KeepKey and filled in with one click.</p>
          </div>
          <div className="lg:w-[20vw] w-full flex flex-col gap-y-3 justify-center items-center p-4 border-4 border-red-500 text-center">
            <Image width={70} height={70} unoptimized src="/lock.gif" alt="icon3"  />
            <div className="font-bold">Share passwords</div>
            <p className="text-sm text-center text-gray-800">If others need access to your accounts, share login information securely through KeepKey either with your team at work or with your family at home.</p>
          </div>
        </div>
      </div>

      <div className='bg-gray-600 w-full h-1'></div>
      <div className="py-12">
        <h2 className="text-center font-bold text-2xl text-gray-800">Learn more about us</h2>
        <div className="flex md:mx-0 mx-2 justify-center items-center mt-5">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/JJjBPBWaeYU?si=U_qP117rNVaZXlX5" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>

      <div className='bg-gray-600 w-full h-1'></div>

    </>
  );
}

export const metadata = {
  title: 'Keekey - Secure & Effortless Website Password Manager',
  description: 'Keekey is your trusted solution for managing website passwords with military-grade encryption and a user-friendly interface. Save, organize, and autofill your login credentials securely across devices—eliminating the need to remember multiple passwords. With features like two-factor authentication, breach alerts, and one-click login, Keekey ensures your digital life remains safe, simple, and in your control.'
}
