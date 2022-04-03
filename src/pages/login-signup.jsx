import React from 'react'
import GoogleLogin from 'react-google-login'
import { connect } from 'react-redux'

import { onLogin, onSignup, onLoginFromGoogle } from '../store/user.action.js'
import { GoogleAccount } from '../cmps/google-account.jsx'


class _LoginSignup extends React.Component {
    state = {
        fullname: '',
        username: '',
        password: '',
        isLogin: true,
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ ...prevState, [field]: value }))
    }
    toggleLogin = () => {
        this.setState(prevState => ({ ...prevState, isLogin: !prevState.isLogin }))
    }
    onSubmitForm = (ev) => {
        ev.preventDefault()
        const { fullname, username, password, isLogin } = this.state
        if (!username || !password) return
        if (!fullname && !isLogin) return
        if (isLogin) this.onLoginUser()
        else this.onSignupUser()
    }
    onLoginUser = async () => {
        try {
            await this.props.onLogin(this.state)
            this.props.history.push('/board')
        } catch (err) {
            console.log('Problem To Log In:', err);
        }
    }

    onSignupUser = async () => {
        const user = await this.props.onSignup(this.state)
        if (user.username) this.props.history.push('/board')
    }

    onLoginGoogle = async (password, givenName, lastName, email) => {
        try {
            lastName = lastName || ''
            givenName = givenName || ''
            const fullname = givenName + lastName
            const username = email
            const user = await this.props.onLoginFromGoogle({ fullname, username, password })
            if (user.username) this.props.history.push('/board')
        } catch (err) {
            console.log('Problem To Log In:', err);
        }
    }
    render() {
        const { fullname, username, password, isLogin } = this.state
        return (
            <section className='container'>
                <h1 className='Header'>Prello</h1>
                <div className='log-container'>
                    <form onSubmit={this.onSubmitForm}>
                        <section>
                            <h3>{isLogin ? 'Log in to Prello' : 'Sign up for your account'}</h3>
                            <div className='field'>
                                <label>
                                    <input placeholder=' Enter username...' type="text" value={username} name='username' onChange={this.handleChange} />
                                </label>
                            </div>

                            {!isLogin &&
                                <div className='field'>
                                    <label>
                                        <input placeholder=' Enter full name...' type="text" value={fullname} name='fullname' onChange={this.handleChange} />
                                    </label>
                                </div>
                            }

                            <div className='field'>
                                {isLogin ?
                                    <label >
                                        <input placeholder=' Enter password...' type="password" value={password} name='password' onChange={this.handleChange} />
                                    </label>
                                    :
                                    <label >
                                        <input
                                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                            placeholder=' Enter password...'
                                            type="password"
                                            value={password}
                                            name='password'
                                            onChange={this.handleChange} />
                                    </label>
                                }
                            </div>

                            <button type='submit' className='main-button'>{isLogin ? 'Login' : 'Sign up'}</button>
                        </section>
                    </form >
                    <div className='toggle-login'>
                        <p>{!isLogin ? 'Already have an account?' : 'Don\'t have an account?'}
                            <button type='button' onClick={this.toggleLogin}>{!isLogin ? 'Move to Login' : 'Move to Sign-up'}</button>
                        </p>
                    </div>
                    <div className='or'>
                        OR
                    </div>
                    <div className='google-container'>
                        <GoogleAccount loginGoogle={this.onLoginGoogle} />
                    </div>


                </div >




            </section>
        )
    }
}

function mapStateToProps({ userModule }) {
    return {
        user: userModule.user,
        users: userModule.users,
    }
}

const mapDispatchToProps = {
    onLogin,
    onSignup,
    onLoginFromGoogle
}


export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)
