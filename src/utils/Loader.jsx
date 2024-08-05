import React from 'react'
import { logo } from "../assets";


function Loader() {
  return (
   <>
    <div className="spinner_customize">
         <div className="spinning-container">
            <img src={logo} alt='logo' className='w-15 h-12 object-contain spinning-image' />
        </div>
      </div>
   </>
  )
}

export default Loader