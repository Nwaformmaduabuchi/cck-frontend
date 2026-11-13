"use client";

import { GoogleLogin } from "@react-oauth/google";

export default function GoogleButton() {
    return (
        <GoogleLogin
            onSuccess={async credentialResponse => {
                const response = await fetch(
                "http://localhost:8000/users/google-login/",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        id_token:credentialResponse.credential
                    })
                }
                    )
                        }}
                    />
                );
}