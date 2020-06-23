//dependencias
import React, { useState, useContext } from "react";
import Router, { useRouter } from "next/router";
import FileUploader from "react-firebase-file-uploader";
//componentes
import Layout from "../components/layouts/Layout";
//hooks
import useValidacion from "../hooks/useValidacion";
//firebase
import firebase, { FirebaseContext } from "../firebase";

//stilos
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";
import { css } from "@emotion/core";
//validaciones
import ValidarCrearProducto from "../Validar/ValidarCrearProducto";
import Error404 from "../components/layouts/404";

const NuevoProducto = () => {
  //state inicial del formulario
  const STATE_INICIAL = {
    nombre: "",
    empresa: "",
    imagen: "",
    url: "",
    descripcion: "",
  };

  //context
  const { usuario, firebase } = useContext(FirebaseContext);
  //state
  console.log(usuario);

  const [error, setError] = useState(false);

  const [ImagenNombre, setImagenNombre] = useState("");
  const [Subiendo, setSubiendo] = useState(false);
  const [Progreso, setProgreso] = useState(0);
  const [UrlImagen, setUrlImagen] = useState("");

  //valores del hook
  const {
    //state
    valores,
    errores,
    submit,
    //funciones
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidacion(STATE_INICIAL, ValidarCrearProducto, crearProducto);

  const { nombre, empresa, url, descripcion } = valores;

  //HOOK PARA REDIRECCIONAR
  const router = useRouter();

  //funciones ṕara la imagen
  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  };

  const handleProgress = (progreso) => setProgreso({ progreso });

  const handleUploadError = (error) => {
    setSubiendo(error);
    console.log(error);
  };

  const handleUploadSuccess = (nombre) => {
    setProgreso(100);
    setSubiendo(false);
    setImagenNombre(nombre);
    firebase.storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL()
      .then((url) => {
        setUrlImagen(url);
        console.log("url", url);
      });
  };

  async function crearProducto() {
    //si el usuario no esta autenticado llevar al login
    if (!usuario) {
      return router.push("/Login");
    }
    const producto = {
      nombre,
      empresa,
      votos: 0,
      url,
      descripcion,
      comentarios: [],
      creado: Date.now(),
      UrlImagen,
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName,
      },
      Votantes: []
    };
    //insertarlo en la base de datos
    firebase.db.collection("productos").add(producto);

    return Router.push("/");
  }

  return (
    <div className="">
      <Layout>
        {!usuario ? <Error404 /> : (
          <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
              margin-bottom: 5rem;
            `}
          >
            Agregar nuevo producto
          </h1>
          <Formulario onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend>Informacion general</legend>
              <Campo className="">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  placeholder="Nombre del producto "
                  name="nombre"
                  value={nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>
              {errores.nombre && <Error>{errores.nombre}</Error>}
              <Campo className="">
                <label htmlFor="nombre">Empresa</label>
                <input
                  type="text"
                  id="empresa"
                  placeholder="Tu Empresa"
                  name="empresa"
                  value={empresa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>
              {errores.empresa && <Error>{errores.empresa}</Error>}
              <Campo className="">
                <label htmlFor="imagen">Imagen</label>
                <FileUploader
                  accept="image/*"
                  id="imagen"
                  name="imagen"
                  randomizeFilename
                  storageRef={firebase.storage.ref("productos")}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </Campo>

              <Campo className="">
                <label htmlFor="url">URL</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={url}
                  placeholder="URL de tu producto"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>
              {errores.url && <Error>{errores.url}</Error>}
            </fieldset>
            <fieldset>
              <legend>Sobre tu producto</legend>

              <Campo className="">
                <label htmlFor="descripcion">Descripcion</label>
                <textarea
                  type="descripcion"
                  id="descripcion"
                  name="descripcion"
                  value={descripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>
              {errores.descripcion && <Error>{errores.descripcion}</Error>}
            </fieldset>
            {error && <Error>{error} </Error>}
            <InputSubmit type="submit" value="Crear producto" />
          </Formulario>
        </>

        ) }
        
      </Layout>
    </div>
  );
};
export default NuevoProducto;
