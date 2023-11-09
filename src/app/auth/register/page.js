'use client'
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useForm } from 'react-hook-form'


function RegisterPage() {

    const router = useRouter();

  const { register, handleSubmit, formState:{errors} } = useForm();

  const onSubmit = handleSubmit ( async data => {
    if (data.password !== data.confirmPassword) {
        return alert("Passwords do not match")
    }


    const res = await fetch("/api/auth/register", {
        method: 'POST',
        body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password
        }),
        headers: { 'Content-Type': 'application/json'}
    })
    
    

   if (res.ok) {
        router.push('/auth/login')
    }

    console.log(res)
  });

  

  return (
    <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>

      <form onSubmit={onSubmit} className='w-1/4'>
        <h1 className='text-slate-200 font-bold text-3xl mb-4'>Register</h1>

        <label htmlFor='username' className='text-slate-500 mb-2 block text-sm'> Username: </label>
        <input placeholder='Tu usuario' type="text" {...register("username", { required: {value: true, message: "Usuario es requerido"} })}
          className='p-3 rounded border block mb-2 bg-slate-900 text-slate-200 w-full' />
          {
            errors.username && (<span className='text-red-500'> {errors.username.message} </span>)
          }

        <label htmlFor='email' className='text-slate-500 mb-2 block text-sm'>Email: </label>
        <input placeholder='Tu email' type="email" {...register("email", { required: {value: true, message: "Email es requerido"} })}
          className='p-3 rounded border block mb-2 bg-slate-900 text-slate-200 w-full' />
          {
            errors.email && (<span className='text-red-500'> {errors.email.message} </span>)
          }

        <label htmlFor='password' className='text-slate-500 mb-2 block text-sm'> Password: </label>
        <input placeholder='Tu password' type="password" {...register("password", { required: {value: true, message: "Password es requerido"} })}
          className='p-3 rounded border block mb-2 bg-slate-900 text-slate-200 w-full' />
          {
            errors.password && (<span className='text-red-500'> {errors.password.message} </span>)
          }

        <label htmlFor='confirmPassword' className='text-slate-500 mb-2 block text-sm'> Confirm password </label>
        <input placeholder='Repite password' type="password" {...register("confirmPassword", { required: {value: true, message:"Confirmaciòn es requerido"}})}
          className='p-3 rounded border block mb-2 bg-slate-900 text-slate-200 w-full' />
          {
            errors.confirmPassword && (<span className='text-red-500'> {errors.confirmPassword.message} </span>)
          }

        <button className="w-full bg-blue-500 p-2 mt-2 text-white font-bold mb-4 rounded-lg border">
          Register
        </button>

      </form>
    </div>
  )
}

export default RegisterPage