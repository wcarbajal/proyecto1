'use client'

import Link from "next/link"


function Salir() {
  return (
    
    <Link href="/" className=' hover:text-blue-500' onClick={() => singOut()}>Salir </Link>
  )
}

export default Salir
