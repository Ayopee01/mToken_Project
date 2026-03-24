import React from 'react'

function page2() {
    return (
        <section>
            <div className='flex flex-col items-center min-h-screen justify-center'>
                <p className='text-2xl mb-4'>Page2</p>
                <div>
                    <p className=''>Test back button</p>
                    <div className='flex flex-col items-center'>
                        <a className='hover:text-red-400' href="/landing/test1">test1</a>
                        <a className='hover:text-red-400' href="/landing/test2">test2</a>
                        <a className='hover:text-red-400' href="/landing/test3">test3</a>
                        <a className='hover:text-red-400' href="/landing/test4">test4</a>
                        <a className='hover:text-red-400' href="/landing/test5">test5</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page2