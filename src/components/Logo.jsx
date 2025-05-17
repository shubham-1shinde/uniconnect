import React from 'react'
import mitlogo from "./Header/mitlogo1.png"
function Logo({width = '100px'}) {
  return (
    <div className='h-25 w-25'>
      <img src={mitlogo }/>
    </div>
  )
}

export default Logo