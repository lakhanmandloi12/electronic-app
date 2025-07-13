import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import './Brand.css'
function Brand() {
  return (
    <div>
        <Navbar/>
        <div>
           <Sidebar/>

        </div>
          <div className='brand'>Brand</div>
    </div>
  )
}

export default Brand