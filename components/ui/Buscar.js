import React, { useState } from 'react'
import styled from '@emotion/styled';
import { css } from "@emotion/core";
import Router from 'next/router'
const Input = styled.input`
border :1px solid var(--gris3); 
padding:1rem;
min-width:300px;
`;

const Submit = styled.button`
height: 3rem;
width:3rem;
display:block;
background-size:4rem;
background-image:url(/static/img/buscar.png);
background-repeat:no-repeat;
position: absolute;
right:1rem;
top:1px;
background-color:white; 
cursor:pointer;
border:none;
text-indent:-9999px;
color:transparent;
`;


const Buscar = () => {
    const [Busqueda, setBusqueda] = useState('')


     const buscarProducto = e=> {
         e.preventDefault();
         console.log('buscando ' ,Busqueda);
         if(Busqueda.trim() === '') return 
         //redireccionar a /buscar
         Router.push({
             pathname: '/Buscar',
             query: {q: Busqueda}
         })
     }
    return ( 
        <form
        css={css`
        position:relative;
        `}
        onSubmit={buscarProducto}
        >
            <Input
            placeholder="buscar productos"
            type="text"
            onChange={e => setBusqueda(e.target.value)}
            />
            <Submit type="submit">Buscar</Submit>
        </form>
      );
}
 
export default Buscar;