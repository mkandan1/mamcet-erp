import React from 'react'

export const ButtonLayout = ({ cols, marginTop, children }) => {
    const colSpan = cols ? cols : '12';
    return (

        <div className={`grid absolute bottom-0 left-0 right-0 px-20 border bg-base-200 py-5 grid-cols-${colSpan} grid-rows-1 gap-x-4 row-span-1 col-span-${colSpan} items-center mt-${marginTop ? marginTop : '4'}`}>
            <div className={`col-span-${colSpan} flex gap-2 justify-end`}>
                {children}
            </div>
        </div>
    )
}
