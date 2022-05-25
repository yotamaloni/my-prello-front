import React from 'react'
import { NavLink } from 'react-router-dom'

import Button from '@mui/material/Button';

import { HomeHeader } from '../cmps/home-header.jsx'

export class AppHome extends React.Component {

    render() {

        return (
            <section className="app-home">
                <HomeHeader />
                <div className='home-container'>
                    <div className='txt-container'>
                        <h1 className='title'>Prello helps teams move work forward.</h1>
                        <p>Collaborate, manage projects, and reach new productivity peaks.
                            From high rises to the home office, the way your team works is unique — accomplish it all with Prello...</p>
                        <div className='config-container flex default-gap'>
                            <NavLink className="clean-link" to='/board'>
                                <Button sx={{ fontFamily: 'inherit', }} variant="contained">
                                    Try as a guest
                                </Button>
                            </NavLink>


                        </div>

                    </div>
                    <img src="https://res.cloudinary.com/dnft2vfvz/image/upload/v1646567068/Prello/sdvwput4a2qynrqsffm2.png" alt="Image not found" />

                </div>

            </section >

        )
    }
}


