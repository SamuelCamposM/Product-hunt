import App from 'next/app';
import firebase , {FirebaseContext } from '../firebase'
import useAuth from '../hooks/useAuth';


const Myapp = props=> {
    const usuario =  useAuth();
    console.log(usuario);
    

const {Component , pageProps } = props

    return (
<FirebaseContext.Provider
value={{
    firebase,
    usuario
}}
>

    <Component {...pageProps} />
    {props.children}
</FirebaseContext.Provider>
    )
}
export default Myapp;