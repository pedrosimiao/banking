'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import React from 'react'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'

import Footer from './Footer'

const Sidebar = ({ user }: SiderbarProps) => {
    const pathname = usePathname()

    return (
        <section className='sidebar'>
            <nav className='flex flex-col gap-4'>
                <Link href="/" className='flex mb-2 cursor-pointer items-center gap-0'>
                    <Image src="/icons/logo-simeone.png" width={80} height={80} alt='Simeone logo' className='size-[80px] max-xl:size-14' />
                    <Image src="/icons/logo-simeone-2.png" width={160} height={64} alt='Simeone logo' className='max-xl:w-40' />
                </Link>

                {sidebarLinks.map((item) => {
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

                    return (
                        <Link
                            href={item.route}
                            key={item.label}
                            className={cn(
                                'sidebar-link', { 'bg-bankGradient': isActive }
                            )}>
                            <div className='relative size-6'>
                                <Image
                                    src={item.imgURL}
                                    alt={item.label}
                                    fill
                                    className={cn({
                                        'brightness-[3] invert-0': isActive
                                    })}
                                />
                            </div>
                            <p className={cn('sidebar-label', { '!text-white': isActive })}>
                                {item.label}
                            </p>
                        </Link>
                    )
                })}
                USER
            </nav>

            <Footer user={user} />
        </section>
    )
}

export default Sidebar
