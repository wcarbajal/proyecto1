
import Link from 'next/link'
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Salir from './Salir';

async function Navbar() {

    const session = await getServerSession(authOptions)
    console.log("Informacion de sesion: ", session)

    return (
        <nav className='flex justify-between bg-zinc-800 text-white px-6 w-full h-10 items-center'>
            <h1>
                <Link href="/" className=' hover:text-blue-500 font-bold text-lg'>
                    NextAuth
                </Link>
            </h1>
            <ul className='flex gap-x-2'>
              
                { 
                    
                    (!session?.user === undefined)
                        ? (
                        <>
                            <Link href="/" className=' hover:text-blue-500 '>Home
                            </Link>

                            <Link href="/auth/login" className=' hover:text-blue-500'>Login
                            </Link>


                            <Link href="/auth/register" className=' hover:text-blue-500'>Register
                            </Link>
                        </> )
                        :
                        (<>
                            <Link href="/" className=' hover:text-blue-500 '>Home
                            </Link>

                            <Link href="/Dashboard" className=' hover:text-blue-500'>Dashboard
                            </Link>

                            <Link href="/api/auth/signout" className=' hover:text-blue-500'>Salir
                            </Link>
                            
                        </>)

                }


            </ul>
        </nav>
    )
}

export default Navbar
