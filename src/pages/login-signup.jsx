import React from 'react'
import { connect } from 'react-redux'

import { onLogin, onSignup } from '../store/user.action.js'

import { userService } from '../services/user.service.js'

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
        if (this.state.isLogin) this.onLoginUser()
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

    onSignupUser = () => {
        this.props.onSignup(this.state)
        this.props.history.push('/board')

    }
    render() {
        const { fullname, username, password, isLogin } = this.state
        return (
            <section className='container'>
                <h1 className='Header'>Prello</h1>
                <div className='log-container'>
                    <form onSubmit={(ev) => {
                        this.onSubmitForm(ev)
                    }}>
                        {isLogin &&
                            <section>
                                <h3>Log in to Prello</h3>
                                <div className='field'>
                                    <label>
                                        <input placeholder=' Enter username...' type="text" value={username} name='username' onChange={this.handleChange} />
                                    </label>
                                </div>

                                <div className='field'>

                                    <label >
                                        <input placeholder=' Enter password...' type="password" value={password} name='password' onChange={this.handleChange} />
                                    </label>
                                </div>
                                <button type='submit' className='main-button'>Login</button>
                            </section>
                        }
                        {!isLogin &&
                            <section>
                                <h3>Sign up for your account</h3>
                                <div className='field'>
                                    <label>
                                        <input placeholder='Enter full name...' type="text" value={fullname} name='fullname' onChange={this.handleChange} />
                                    </label>
                                </div>
                                <div className='field'>
                                    <label>
                                        <input placeholder='Enter username...' type="text" value={username} name='username' onChange={this.handleChange} />
                                    </label>
                                </div>

                                <div className='field'>

                                    <label >
                                        <input placeholder='Enter password...' type="password" value={password} name='password' onChange={this.handleChange} />
                                    </label>
                                </div>
                                <button type='submit' className='main-button'>Sign up</button>
                            </section>
                        }
                    </form >
                    <div className='toggle-login'>
                        <p>{!isLogin ? 'Already have an account?' : 'Don\'t have an account?'}
                            <button type='button' onClick={this.toggleLogin}>{!isLogin ? 'Move to Login' : 'Move to Sign-up'}</button>
                        </p>
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
}


export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)
