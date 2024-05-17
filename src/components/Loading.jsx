import { Icon } from '@iconify/react'
import React from 'react'
import { useSelector } from 'react-redux'

export const FullScreenLoading = () => {
    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 w-screeen h-screen bg-white text-t4 flex justify-center items-center z-10'>
            <Icon icon={'tabler:circle-dotted'} className='animate-spin text-6xl duration-1000' />
        </div>
    )
}

export const TopBarLoading = () => {
    const loading = useSelector((state)=> (state.loadingTopBar))
    if(!loading.show){
        return
    }
    return (
        <div className="top-bar-loading absolute top-[88px]">
            <div className="spinner">Hi</div>
        </div>
    );
};
