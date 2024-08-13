import React from 'react'

export const ButtonLayout = ({ cols, marginTop, children }) => {
    const colSpan = cols ? cols : '12';
    return (

        <div className={`w-full flex justify-end mt-10 items-center`}>
            <div className={`col-span-${colSpan} flex justify-end gap-2`}>
                {children}
            </div>
        </div>
    )
}
