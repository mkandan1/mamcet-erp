import React from 'react'

export const FormLayout = ({ children, rows, cols }) => {
    return (
        <div className={`grid grid-cols-${cols} grid-rows-${rows} row-span-${rows} col-span-${cols} mx-4 p-5`}>
            <div className={`grid grid-cols-${cols} row-span-${rows} col-span-${cols} w-full h-full gap-x-5`}>
                {children}
            </div>
        </div>
    )
}
