import React from "react";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import Link from 'next/link';

const ProductoListado = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
`;

const Imagen = styled.img`
  width: 200px;
`;
const DescripcionProducto = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;

`;

const TextoDescripcion = styled.p`
font-size:1.6rem;
    margin:0;
    margin-top:1rem;
    color :#888;
`;


const Titulo = styled.a`
font-size:2rem;
font-weight:bold;
margin:0;
text-decoration:none;
transition: 500ms ;
:hover{
  cursor:pointer;
  color:blue;
}
`;
const Comentarios  = styled.div`

margin-top:2rem;
display:flex;
align-items:center;
div{
display:flex;
align-items:center;
border:1px solid #e1e1e1;
padding: .3rem 1rem;
margin-right:2rem;
}

img{
 width: 2rem;
 margin-right:2rem;
}
p{
font-size:1.6rem;
margin:1rem;
font-weight:700;
&:last-of-type{
  margin:0 auto ;
}
}
`;

const Votos = styled.div`
flex:0 0 auto;
text-align:center;
border:1px solid #e1e1e1;
padding:1rem 3rem;

div{
  font-size:2rem;
  
}
p{
  padding:2rem;
  margin:0;
  font-size:2rem;
  font-weight:700;
}
`;

const Producto = ({ producto }) => {
  const {
    id,
    nombre,
    url,
    descripcion,
    votos,
    comentarios,
    creado,
    empresa,
    UrlImagen,
  } = producto;
  return (
    <ProductoListado>
      <DescripcionProducto className="">
        <div className="">
          <Imagen src={UrlImagen} alt="imagen" />
        </div>
        <div className="">

        <Link href="/productos/[id]"   as={`/productos/${id}`} >

          <Titulo>{nombre}</Titulo  >
          </Link>
          <TextoDescripcion>{descripcion}</TextoDescripcion>

          <Comentarios className="">

            <div className="">
              <img src="/static/img/comentario.png" alt="" />
            <p>{comentarios.length} Comentarios </p>
            </div>

          </Comentarios>
          <p>
          Publicado hace: {formatDistanceToNow(new Date(creado) ,{locale : es  } )}
        </p>
        </div>
      </DescripcionProducto>
      <Votos className="">
        <div className="">&#9650;</div>

        <p>{votos}</p>
      </Votos>
    </ProductoListado>
  );
};

export default Producto;
