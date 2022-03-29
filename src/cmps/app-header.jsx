import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { dataService } from '../services/data.service.js'

import { onLogout } from '../store/user.action.js'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { SearchInput } from './search-input.jsx'
import { MemberIcon } from '../cmps/member-icon.jsx'

function _AppHeader(props) {
    const history = useHistory()

    function onLogoutUser() {
        props.onLogout()
        history.push('/login-signup')
    }

    let { loadBoards, isBoardDetails, user } = props
    let txtLog = 'Logout'
    if (!user) {
        txtLog = 'Login'
        user = dataService.guestUser
    }
    const fitClassName = isBoardDetails ? 'board-details-class' : 'app-board-class'
    return (
        <section className={`app-header ${fitClassName}`}>
            <div className='main-nav flex default-gap'>
                <NavLink className="clean-link logo top-nav-btn" to='/'>Prello</NavLink>
                <NavLink className="clean-link top-nav-btn" to='/board'>Workspaces</NavLink>
            </div>
            <div className='config'>
                <SearchInput loadBoards={loadBoards} isBoardDetails={isBoardDetails} />
                <div title={txtLog} onClick={onLogoutUser} className={`user clickable clean-link`}>
                    <MemberIcon member={user} size={32} className='top-nav-btn' />
                </div>
            </div>
        </section >
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
