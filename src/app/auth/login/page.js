'use client'
import { useForm } from 'react-hook-form'
import {signIn} from 'next-auth/react'
import { useRouter } from "next/navigation";
import { useState } from 'react'



function LoginPage() {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const router = useRouter();

    const [error, setError] = useState(null)

    const onSubmit = handleSubmit (async data => {
        console.log(data)

        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        })
            if (res.error) {
                setError(res.error)
            }else{
                console.log("Enviando a /dashboard");
                router.push('/dashboard');
            }
        console.log("Aqui empieza el res: ", res);
    });

    return (
        <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
            <form onSubmit={onSubmit} className='w-1/4'>


                <h1 className='text-slate-200 font-bold text-3xl mb-4 pt-2'>Login</h1>

                <label htmlFor='email' className='text-slate-500 mb-2 block text-sm'> Email: </label>
                <input placeholder='Tu usuario' type="text" {...register("email", { required: { value: true, message: "Usuario es requerido" } })}
                    className='p-3 rounded border block mb-2 bg-slate-900 text-slate-200 w-full' />
                {
                    errors.email && (<span className='text-red-500'> {errors.email.message} </span>)
                }

                <label htmlFor='password' className='text-slate-500 mb-2 block text-sm'> Password: </label>
                <input placeholder='Tu password' type="password" {...register("password", { required: { value: true, message: "Password es requerido" } })}
                    className='p-3 rounded border block mb-2 bg-slate-900 text-slate-200 w-full' />
                {
                    errors.password && (<span className='text-red-500'> {errors.password.message} </span>)
                }
                <button className="w-full bg-blue-500 p-2 mt-2 text-white font-bold mb-4 rounded-lg border">
                    Ingresar
                </button>
                {
                    error && (
                        <p className='bg-red-500 text-lg h-8 text-white p-1 rounded flex justify-center items-center'>{error}</p>
                    )
                }
            </form>
        </div>
    )
}

export default LoginPage