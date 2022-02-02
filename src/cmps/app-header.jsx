import React from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { onLogout } from '../store/user.action.js'


import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';

import { NavLink } from 'react-router-dom'

import { userService } from '../services/user.service.js'
import { SearchInput } from './search-input.jsx'
import { MemberIcon } from '../cmps/member-icon.jsx'

class _AppHeader extends React.Component {

    componentDidMount() {
    }

    onLogoutUser = () => {
        this.props.onLogout()
        // this.props.history.push('/login-signup')
    }

    render() {
        const fitClassName = this.props.isBoardDetails ? 'board-details-class' : 'app-board-class'
        const { user } = this.props
        return (
            <section className={`app-header ${fitClassName}`}>
                <div className='main-nav flex default-gap'>
                    <AppsOutlinedIcon className='top-nav-btn' />
                    <NavLink className="clean-link logo top-nav-btn" to='/'>Prello</NavLink>
                    <NavLink className="clean-link top-nav-btn" to='/board'>Workspaces</NavLink>
                </div>
                <div className='config'>
                    <SearchInput />
                    <InfoOutlinedIcon className='top-nav-btn' />
                    {user?.username ?
                        <Link to='/login-signup' onClick={this.onLogoutUser} className='clickable clean-link'>
                            <MemberIcon member={user} size={32} className='top-nav-btn' />
                        </Link>
                        :
                        <Link to='/login-signup' className='clean-link' >
                            <AccountCircleOutlinedIcon className='top-nav-btn' />
                        </Link>
                    }
                </div>
            </section>
        )
    }


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
