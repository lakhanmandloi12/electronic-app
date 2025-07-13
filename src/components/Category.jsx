import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import './Category.css'
function Category() {
  return (
  
   <div>
        <Navbar/>
        <div>
            <Sidebar/>
        </div>
       <div className='category'>Category</div>
    </div>
  )
}

export default Category