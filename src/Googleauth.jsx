import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

const Googleauth = () => {


    return (
        <>


            <GoogleOAuthProvider clientId="15785452363-l05ufcn65g456nspssmmiruq239f252c.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </GoogleOAuthProvider>
        </>
    )
}

export default Googleauth