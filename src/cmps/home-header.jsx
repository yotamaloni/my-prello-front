import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Button from '@mui/material/Button';

export function HomeHeader() {

    return (
        <header className='home-header flex'>
            <div className='home-nav flex default-gap'>
                <NavLink className="clean-link logo top-nav-btn" to='/'>Prello</NavLink>
            </div>

            <div className='config'>
                <NavLink className="clean-link" to='/login-signup'>
                    <Button sx={{ fontFamily: 'inherit', }} variant="contained">
                        Log in
                    </Button>
                </NavLink>

            </div>
        </header>
    )
}