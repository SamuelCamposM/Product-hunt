//dependencias
import React, { useState } from 'react'
import Router from 'next/router'
//componentes
import Layout from "../components/layouts/Layout";
//hooks
import useValidacion from "../hooks/useValidacion";
//firebase
import firebase from '../firebase'
//stilos
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario";
import { css } from "@emotion/core";
//validaciones
import ValidarCrearCuenta from "../Validar/ValidarCuenta";
const CrearCuenta = () => {

  const [error , setError] = useState(false) 
  const STATE_INICIAL = {
    nombre: "",
    email: "",
    password: "",
  };

  const {
    //state
    valores,
    errores,
    submit,
    //funciones
    handleChange,
    handleSubmit,
    handleBlur
  } = useValidacion(STATE_INICIAL, ValidarCrearCuenta, crearCuenta);

  const {nombre , email , password } = valores
  async function crearCuenta() {
try {
  const usuario = await firebase.registrar(nombre , email , password)
  console.log("usuario",usuario);
  
  Router.push('/')
} catch (error) {
  console.error('Hubo un error al crear el usuario', error)
  setError(error.message)
}
  }


  return (
    <div className="">
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
              margin-bottom: 5rem;
              `}
          >
            Incio
          </h1>
          <Formulario
          onSubmit={handleSubmit}
          noValidate
          >
          
            <Campo className="">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                placeholder="Tu nombre"
                name="nombre"
                value={nombre}
          onChange={handleChange}
          onBlur={handleBlur}
              />
            </Campo>
  {errores.nombre && <Error>{errores.nombre}</Error> }
            <Campo className="">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Tu email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.email && <Error>{errores.email}</Error> }
            <Campo className="">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Tu password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.password && <Error>{errores.password}</Error> }
            {error && <Error>{error} </Error>}
            <InputSubmit type="submit" value="Crear cuenta" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default CrearCuenta;
