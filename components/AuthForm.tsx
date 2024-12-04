'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import Link from 'next/link'
import Image from 'next/image'

import { Loader2 } from 'lucide-react'


import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import CustomInput from './CustomInput'

import { authFormSchema } from '@/lib/utils'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'


const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const formSchema = authFormSchema(type)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            // Securing that no defaultValue returns undefined
            firstName: "",
            lastName: "",
            address1: "",
            city: "",
            state: "",
            postalCode: "",
            dateOfBirth: "",
            ssn: ""
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)

        try {
            // Sign up with Appwrite and create Plaid link token

            if (type === 'sign-up') {
                const newUser = await signUp(data)

                setUser(newUser)
            }

            if (type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password
                })

                if (response) router.push('/')
            }

        } catch (error) {
            console.log(error)
        } finally {
            console.log('Dados enviados:', data)
            setIsLoading(false)
        }

    }

    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-2 mb-4 md:gap-5'>
                <Link href="/" className='flex cursor-pointer justify-center items-center'>
                    {/* <Image src="/icons/logo-simeone.png" width={80} height={80} alt='Simeone logo' className='size-[80px] max-xl:size-14' /> */}
                    <Image src="/icons/logo-simeone-2.png" width={240} height={80} alt='Simeone logo' className='max-xl:w-40' />
                </Link>

                {/* <div className='flex flex-col gap-1 md:gap-3 bg-[#4b4b4b] border-none rounded-md shadow-md opacity-80 px-2 py-2'> */}
                <div className='flex flex-col gap-1 md:gap-3 px-2 py-2'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-100'>
                        {user
                            ? 'Link Account'
                            : type === 'sign-in'
                                ? 'Sign In'
                                : 'Sign Up'
                        }
                        <p className='text-16 font-normal mt-2 text-gray-100'>
                            {user
                                ? 'Link your account to get started'
                                : 'Please enter your details'
                            }
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className='flex flex-col gap-4'>
                    {/* PlaidLink */}
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            {type === 'sign-up' && (
                                <>
                                    <div className='flex gap-4'>
                                        <CustomInput
                                            control={form.control}
                                            name='firstName'
                                            label='First Name'
                                            placeholder='Enter your first name'
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name='lastName'
                                            label='Last Name'
                                            placeholder='Enter your last name'
                                        />
                                    </div>

                                    <CustomInput
                                        control={form.control}
                                        name='address1'
                                        label='Address'
                                        placeholder='Enter your specific address'
                                    />

                                    <CustomInput
                                        control={form.control}
                                        name='city'
                                        label='City'
                                        placeholder='Enter your city'
                                    />

                                    <div className='flex gap-4'>
                                        <CustomInput
                                            control={form.control}
                                            name='state'
                                            label='State'
                                            placeholder='ex: NY'
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name='postalCode'
                                            label='Postal Code'
                                            placeholder='ex: 11101'
                                        />
                                    </div>

                                    <div className='flex gap-4'>
                                        <CustomInput
                                            control={form.control}
                                            name='dateOfBirth'
                                            label='Date of Birth'
                                            placeholder='yyyy-mm-dd'
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name='ssn'
                                            label='SSN'
                                            placeholder='ex: 1234'
                                        />
                                    </div>
                                </>
                            )}

                            <CustomInput
                                control={form.control}
                                name='email'
                                label='Email'
                                placeholder='Enter your email'
                            />

                            <CustomInput
                                control={form.control}
                                name='password'
                                label='Password'
                                placeholder='Enter password'
                            />

                            <div className='flex flex-col gap-4'>
                                <Button
                                    className='form-btn'
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className='animate-spin' /> &nbsp;
                                            Loading...
                                        </>
                                    ) : type === 'sign-in' ? 'Sign In' : 'Sign up'}
                                </Button>
                            </div>

                        </form>
                    </Form>

                    <footer className='flex justify-center gap-1'>
                        <p className='text-14 font-normal text-gray-600'>
                            {type === 'sign-in'
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </p>
                        <Link
                            href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
                            className='form-link'
                        >
                            {type === 'sign-in' ? 'Sign up' : 'Sign in'}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm
