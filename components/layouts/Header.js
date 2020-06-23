//dependencias
import React  ,{useContext}  from "react";
import Link from "next/link";
//estilos
import { css } from "@emotion/core";
import styled from "@emotion/styled";

//styled components
import Boton from "../ui/Boton";
//componentes
import Buscar from "../ui/Buscar";
import Nav from "./Nav";
import { FirebaseContext } from "../../firebase";


const Contenedor = styled.div`
  max-width: 1200px;
  width: 95%;
  
  margin: 0 auto;
  

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;
const Logo = styled.a`
  color: var(--naranja);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto Slab", serif;
  margin-right: 2rem;
`;

//en gatsby
// const Logo = styled.p[Link]`
// color:var(--naranja);
// font-size:4rem;
// line-height:0;
// font-weight:700;
// font-family:'Roboto Slab', serif;
// margin-right:2rem;

// `;
const Header = () => {

    const { usuario  , firebase} =  useContext(FirebaseContext)
  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gris3);
        padding: 1rem 0;
      `}
    >
      <Contenedor>
        <div 
        css={css`
        display:flex;
        align-items:center;
        `}
        >
          <Link href="/">
            <Logo>P</Logo>
          </Link>
          <Buscar />
          <Nav />
        </div>
        <div  
        css={css`
        display:flex ;
        align-items:center;
        `}
        >
           {usuario ? (
               <>
                  <p>Hola: {usuario.displayName}</p>
                  <Boton bgColor="true" type="button"
                  onClick={async ()=> {
await firebase.cerrarSesion()

                  }}
                  >
                    Cerrar Sesión 
                  </Boton>
                  </>
           ) : (
         <>
     <Link href="/Login">
                    <Boton bgColor="true">Login</Boton>
                  </Link>
        
                  <Link href="/CrearCuenta">
                    <Boton>Registrarse</Boton>
                  </Link>
                  </>
           )} 
        </div>
      </Contenedor>
    </header>
  );
};

export default Header;
