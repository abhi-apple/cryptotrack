import React, { useState } from 'react'
import logo from '../images/logo.jpg'
function Navbar() {
    const [navbar, setnavbar] = useState(false)

    const background=()=>{
        if(window.scrollY>=50){
            setnavbar(true);
        }else{
            setnavbar(false)
        }
    }
    window.addEventListener('scroll',background)
  return (
    <nav className={navbar? 'nav active':'nav'}>
        <a href="#" className='logo -ml-60'>
            <img src={logo} className='' alt="" />
        </a>
        <input type="checkbox" className='menu-btn' id='menu-btn'/>
        <label className='menu-icon' for="menu-btn">
            <span className='nav-icon'></span>
        </label>
    </nav>
  )
}

export default Navbar
