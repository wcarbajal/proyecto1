'use client'
import {signOut} from 'next-auth/react'

function DashboardHamo() {
  return (
    <section className='h-[calc(100vh-7rem)] flex justify-center items-center'>

     
      <div>
      <h1 className='text-white text-5xl'>
        Dashboard page
      </h1>
      <button className="w-full  bg-blue-500 p-2 mt-2 text-white font-bold mb-4 rounded-lg border"
        onClick={ () => signOut() }
      >Salir</button>

      </div>

    </section>
  )
}

export default DashboardHamo
