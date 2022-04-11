import React from 'react'
import GoogleLogin from 'react-google-login'
import { REACT_APP_GOOGLE_CLIENT_ID } from '../services/api.js'
import GoogleIcon from '../img/google-icon.png'

export function GoogleAccount(props) {
    const handleFailure = (res) => {

    }
    const handleLogin = (googleData) => {
        const { profileObj, tokenId } = googleData
        const { familyName, givenName, email } = profileObj
        props.loginGoogle(tokenId, givenName, familyName, email)
    }
    return <section>
        <GoogleLogin
            clientId={REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Continue with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
                <div onClick={renderProps.onClick}
                    style={{
                        color: 'rgba(0,0,0,0.54)',
                        width: '100%',
                        height: '39px',
                        boxShadow: 'rgb(0 0 0 / 20%) 1px 1px 5px 0',
                        borderRadius: '3px',
                        borderColor: 'transparent',
                        background: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}>
                    <img style={{ maxHeight: '30px', width: '30px', marginInlineEnd: '10px' }} src={GoogleIcon} />
                    <div>Continue with Google  </div>
                </div>
            )
            }
        >
        </GoogleLogin >
    </section >
}





