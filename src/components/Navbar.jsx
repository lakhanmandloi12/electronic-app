
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './Navbar.css'
function Navbar() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    
    const storedUserName = Cookies.get('userName');
    if (storedUserName) {
      setUserName(storedUserName);  
    }
  }, []); 
  return (
   
       <div className="container-Nav">
      {userName ? (
        <h1 className='h1'>Welcome, {userName}!</h1>  
      ) : (
        <h1 className='h1'>Welcome, Guest!</h1> 
      )}
    </div>


//  import Cookies from 'js-cookie';

//  // To log out:
//  Cookies.remove('userName');
  )
}

export default Navbar