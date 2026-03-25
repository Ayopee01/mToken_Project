import React from 'react'
import Link from "next/link";

function page4() {
    return (
        <section>
            <div className='flex flex-col items-center min-h-screen justify-center'>
                <p className='text-2xl mb-4'>Page4</p>
                <div>
                    <p className=''>Test back button</p>
                    <div className='flex flex-col items-center'>
                        <Link className='hover:text-red-400' href="/landing/test1">Test1</Link>
                        <Link className='hover:text-red-400' href="/landing/test2">Test2</Link>
                        <Link className='hover:text-red-400' href="/landing/test3">Test3</Link>
                        <Link className='hover:text-red-400' href="/landing/test4">Test4</Link>
                        <Link className='hover:text-red-400' href="/landing/test5">Test5</Link>
                        <Link className='hover:text-red-400' href="/">ไปหน้า Profile</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page4