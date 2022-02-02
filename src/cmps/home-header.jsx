import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Button from '@mui/material/Button';

export class HomeHeader extends React.Component {

    state = {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }



    render() {

        return (
            <header className='home-header flex'>
                <div className='home-nav flex default-gap'>
                    <NavLink className="clean-link logo top-nav-btn" to='/'>Prello</NavLink>
                </div>

                <div className='config'>
                    <Button sx={{ fontFamily: 'inherit', }} variant="contained">
                        <NavLink className="clean-link" to='/login-signup'>
                            Log in
                        </NavLink>
                    </Button>
                </div>
            </header>
        )
    }
}