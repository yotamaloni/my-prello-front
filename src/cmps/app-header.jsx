import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { onLogout } from '../store/user.action.js'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';

import { SearchInput } from './search-input.jsx'
import { MemberIcon } from '../cmps/member-icon.jsx'

function _AppHeader(props) {
    const history = useHistory()

    function onLogoutUser() {
        props.onLogout()
        history.push('/login-signup')
    }

    const fitClassName = props.isBoardDetails ? 'board-details-class' : 'app-board-class'
    const { user } = props
    return (
        <section className={`app-header ${fitClassName}`}>
            <div className='main-nav flex default-gap'>
                {/* <AppsOutlinedIcon className='top-nav-btn' /> */}
                <NavLink className="clean-link logo top-nav-btn" to='/'>Prello</NavLink>
                <NavLink className="clean-link top-nav-btn" to='/board'>Workspaces</NavLink>
            </div>
            <div className='config'>
                <SearchInput />
                {user?.username ?
                    <div onClick={onLogoutUser} className='clickable clean-link'>
                        <MemberIcon member={user} size={32} className='top-nav-btn' />
                    </div>
                    :
                    <Link to='/login-signup' className='clean-link' >
                        <AccountCircleOutlinedIcon className='top-nav-btn' />
                    </Link>
                }
            </div>
        </section>
    )
}



function mapStateToProps({ userModule }) {

    return {
        user: userModule.user

    }
}

const mapDispatchToProps = {
    onLogout
};


export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)
