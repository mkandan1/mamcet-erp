import React from "react";

export const ImageViewer = ({src, alt}) => {
    return(
        <img src={src} alt={alt} className="h-screen w-full"/>
    );
}