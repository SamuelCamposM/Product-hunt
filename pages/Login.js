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
import ValidarIniciarSesion from "../Validar/ValidarIniciarSesion";
const Login = () =>  {

  const [error , setError] = useState('') 
  const STATE_INICIAL = {
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
  } = useValidacion(STATE_INICIAL, ValidarIniciarSesion, iniciarSesion);

  const { email , password } = valores
async function iniciarSesion() {
  try {
    const usuario = await firebase.login(email, password)
    console.log(usuario);
    
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
            Iniciar Sesion
          </h1>
          <Formulario
          onSubmit={handleSubmit}
          noValidate
          >
       
  
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
            <InputSubmit type="submit" value="Iniciar Sesion" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default Login;