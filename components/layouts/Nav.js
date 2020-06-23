import React , {useContext } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { FirebaseContext } from "../../firebase";

const Barra = styled.nav`
padding-left:2rem;


a{
    font-size:1.8rem;
    margin-left:2rem;
    color:var(--gris2) ;
    font-family: 'PT Sans', sans-serif ;
    &:last-of-type{
        margin-right:0;
    }
}
`;
const Nav = () => {
    const {usuario} = useContext(FirebaseContext)
    return (  
        <Barra>
            <Link href="/"> 
            <a>Inicio</a>
            </Link>
            <Link href="/Populares"> 
            <a>Populares</a>
            </Link>
            
            {usuario && (
            <>
            <Link href="/NuevoProducto"> 
            <a>Nuevo Producto</a>
            </Link>  
            </>
            ) }
        </Barra>
    );
}
 
export default Nav;