import React, { useState, useEffect } from "react";

const useValidacion = (stateInitial, validar, fn) => {
  const [valores, setValores] = useState(stateInitial);
  const [errores, setErrores] = useState({});
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    if (submit) {
      const noErrores = Object.keys(errores).length === 0;

      if (noErrores) {
        fn(); // si no hay errores se ejecutara esa funcion
      }

      setSubmit(false);
    }
  }, [errores]);
  //funcion que se ejecuta conforme el usuario escribe algo

  const handleChange = (e) => {
    setValores({
      ...valores,
      [e.target.name]: e.target.value,
    });
  };

  //funcion que se ejecuta cuando el usuario hace Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validar(valores);
    setErrores(erroresValidacion);
    setSubmit(true);
  };

  const handleBlur = e => {
    const erroresValidacion = validar(valores);
    setErrores(erroresValidacion);
  }
  return {
      //state
    valores,
    errores,
    submit,
    //funciones
    handleChange,
    handleSubmit,
    handleBlur
  };
};

export default useValidacion;
