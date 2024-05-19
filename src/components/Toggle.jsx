import React from 'react'

export  const Toggle = ({text}) => {
  return (
    <label className="label cursor-pointer">
        <span className="label-text">{text}</span> 
        <input type="checkbox" className="toggle" />
    </label>
  )
}
