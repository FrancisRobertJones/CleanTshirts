import React from 'react'
interface IContainerProps {
    children: React.ReactNode
}



const Container = ({ children }: IContainerProps) => {
    return (
        <div className='bg-base-100'>
            <div className='max-w-[160rem] min-h-screen mx-auto p-[2.4rem]'>
                {children}
            </div>
        </div>
    )
}


export default Container