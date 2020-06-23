import React, { useState , useEffect} from 'react'

import firebase from '../firebase';

function useAuth() {
    const [usuarioAuth , setUsuarioAuth] = useState(null)
    useEffect(() => {
        const unSuscribe = firebase.auth.onAuthStateChanged(usuario => {
            if (usuario) {
                setUsuarioAuth(usuario)
            }else{
                setUsuarioAuth(null)
            }
        })
        return () =>  unSuscribe();
    }, [])
    return usuarioAuth;
}

export default  useAuth;