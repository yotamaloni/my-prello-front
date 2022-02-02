
import React from 'react'
import { NavLink } from 'react-router-dom'

import { HomeHeader } from '../cmps/home-header.jsx'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// export default function BasicButtons() {
//     return (
//         <Stack spacing={2} direction="row">
//             <Button variant="text">Text</Button>
//             <Button variant="outlined">Outlined</Button>
//         </Stack>
//     );
// }



export class AppHome extends React.Component {

    render() {

        return (
            <section className="app-home">
                <HomeHeader />
                <div className='home-container grid-container'>
                    <div className='txt-container'>
                        <h1 className='title'>Prello helps teams move work forward.</h1>
                        <p>Collaborate, manage projects, and reach new productivity peaks.
                            From high rises to the home office, the way your team works is unique — accomplish it all with Prello...</p>
                        <div className='config-container flex default-gap'>
                            <Button sx={{ fontFamily: 'inherit', }} variant="contained">
                                <NavLink className="clean-link" to='/board'>
                                    Try as a guest
                                </NavLink>
                            </Button>
                            {/* <Button sx={{ fontFamily: 'inherit', }} variant="contained">
                                <NavLink className="clean-link" to='/login-signup'>
                                    Sign up it's free
                                </NavLink>
                            </Button> */}
                        </div>

                    </div>
                    <div className='img'>
                        <img src="https://www.appfox.io/wp-content/uploads/2021/05/How-to-manage-Trello-Power-Up-Limits-Hero-Image.png" alt="" />
                    </div>

                </div>

            </section >

        )
    }
}


