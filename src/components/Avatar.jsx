import React from 'react'
import { Offline, Online } from "react-detect-offline";

export const Avatar = () => {
  return (
    <div>
        <Online>
        <div className="avatar online">
            <div className="w-110 rounded-full">
                <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
        </div>
        </Online>
        <Offline>
        <div className="avatar offline">
            <div className="w-110 rounded-full">
                <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
        </div>
        </Offline>
    </div>
  )
}




