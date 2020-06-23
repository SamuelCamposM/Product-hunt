import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layouts/404";
import Layout from "../../components/layouts/Layout";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import { Campo, InputSubmit } from "../../components/ui/Formulario";
import Boton from "../../components/ui/Boton";
const ContenedorProducto = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const CreadorProducto = styled.p`
  padding: 1.5rem 2rem;
  background-color: #da552f;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;

const Producto = () => {
  //state
  const [producto, setProducto] = useState({});
  const [Error, setError] = useState(false);
  const [Comentario, setComentario] = useState({});
  const [Consultar, setConsultar] = useState(true)
  //context
  const { firebase, usuario } = useContext(FirebaseContext);
  //Routing para obtener el id actual
  const router = useRouter();

  const {
    query: { id },
  } = router;

  useEffect(() => {
    if (id && Consultar === true) {
      const obtenerProducto = async () => {
        const productoQuery = await firebase.db.collection("productos").doc(id);
        const respuesta = await productoQuery.get();
        if (respuesta.exists) {
          setProducto(respuesta.data());
          setConsultar(false)
        } else {
          setError(true);
          setConsultar(false)
        }
      };
      obtenerProducto();
    }
  }, [id]);

  if (Object.keys(producto).length === 0 && !Error) return "Cargando";
  const {
    nombre,
    url,
    descripcion,
    votos,
    comentarios,
    creado,
    empresa,
    UrlImagen,
    creador,
    Votantes,
  } = producto;

  console.log("producto", producto);

  //funcion para hacer voto
  const votarProducto = () => {
    if (!usuario) {
      return router.push("/Login");
    }
    //añadiendo voto
    const totalVotos = votos + 1;

    //verificar si el usuario actual ha votado
    if (Votantes.includes(usuario.uid)) return;

    //guardar el ID del que ha votado

    const nuevoVotantes = [...Votantes, usuario.uid];
    console.log("asdasd", nuevoVotantes);

    //actualizar en la base de datos
    firebase.db
      .collection("productos")
      .doc(id)
      .update({ votos: totalVotos, Votantes: nuevoVotantes });
    //actualizar state
    setProducto({
      ...producto,
      votos: totalVotos,
    
    });
setConsultar(true)
  };
  const crearComentario = (e) => {
    setComentario({
      ...Comentario,
      [e.target.name]: e.target.value,
    });
  };

  const agregarComentario = (e) => {
    e.preventDefault();

    if (!usuario) {
      return router.push("/Login");
    }

    //informacion extra del comentaio

    Comentario.usuarioId = usuario.uid;
    Comentario.usuarioNombre = usuario.displayName;

    //tomar copia de comentarios y agregarlos al arreglo

    const nuevosComentarios = [...comentarios, Comentario];

    //actualizar la DB
    firebase.db.collection("productos").doc(id).update({
      comentarios: nuevosComentarios,
    });
    //actualizat el state
    setProducto({
      ...producto,
      comentarios: nuevosComentarios,
    });
    setConsultar(true)//hay un comentario , tiene que consultar a la db
  };

  //identifica al creador del producto
  const Identificador = (id) => {
    if (creador.id === id) {
      return true;
    }
  };
  //funcion que revisa que el creador del producto sea el mismo que esta autenticado

  const puedeBorrar = () => {
    if (!usuario) return false;
    if (creador.id === usuario.uid) {
      return true;
    }
  };
//elimina un producto de la db

const eliminarProducto = async () => {
  if (!usuario) {
    return router.push("/Login");
  }
  if (creador.id !== usuario.uid) {
    return router.push("/Login");
  }

console.log(id);

  try {
    await firebase.db.collection('productos').doc(id).delete()
    router.push('/')
  } catch (error) {
    console.log(error);
    
  }

}
  return (
    <div className="">
      <Layout>
        {Error ? (
          <Error404 />
        ) : (
          <div
            className="contenedor"
            css={css`
              max-width: 1200px;
              width: 95%;
              padding: 5rem 0;
              margin: 0 auto;
            `}
          >
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              {nombre}
            </h1>
            <ContenedorProducto>
              <div>
                <p>
                  Publicado hace:
                  {formatDistanceToNow(new Date(creado), { locale: es })}
                </p>
                <img src={UrlImagen} alt="" />
                <p>{descripcion}</p>

                <h2>Agrega tu comentario</h2>

                {usuario && (
                  <>
                    <form onSubmit={agregarComentario}>
                      <Campo>
                        <input
                          type="text"
                          name="mensaje"
                          onChange={crearComentario}
                        />
                      </Campo>
                      <InputSubmit value="Agreagar comentario" type="submit" />
                    </form>
                  </>
                )}
                <h2
                  css={css`
                    margin: 2rem 0;
                  `}
                >
                  Comentarios
                </h2>
                {comentarios.length === 0 ? (
                  "Se el primero en comentar"
                ) : (
                  <ul>
                    {comentarios.map((comentario, i) => (
                      <li
                        key={`${comentario.usuarioId}-${i}`}
                        css={css`
                          border: 1px solid #e1e1e1;
                          padding: 2rem;
                        `}
                      >
                        <p>{comentario.mensaje}</p>
                        <p>
                          {" "}
                          -
                          <span
                            css={css`
                              font-weight: bold;
                            `}
                          >
                            {comentario.usuarioNombre}
                          </span>
                        </p>
                        {Identificador(comentario.usuarioId) && (
                          <CreadorProducto>Es creador</CreadorProducto>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <aside>
                <Boton target="_blank" bgColor="true" href={url}>
                  Visitar URL
                </Boton>
                <p>
                  Por {creador.nombre} de : {empresa}{" "}
                </p>
                <div
                  className="div"
                  css={css`
                    margin: 5rem;
                  `}
                ></div>
                <p
                  css={css`
                    text-align: center;
                  `}
                >
                  {votos} Votos
                </p>

                {usuario && <Boton onClick={votarProducto}>Votar</Boton>}
              </aside>
            </ContenedorProducto>
            {puedeBorrar() && (
              <Boton onClick={eliminarProducto}>Eliminar Producto</Boton>
            )}
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Producto;
