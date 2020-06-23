import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";

const useProductos = (order) => {
  //DEFININEDO STATE
  const [Productos, setProductos] = useState([]);
  //STATE DE CONTEXT
  const { firebase } = useContext(FirebaseContext);
  //USESTATE

  useEffect(() => {
    const obtenerProductos = () => {
      firebase.db
        .collection("productos")
        .orderBy(order, "desc")
        .onSnapshot(manejarSnapshot);
    };

    obtenerProductos();
  }, []);

  function manejarSnapshot(snapshot) {
    const productos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setProductos(productos);
}

return {
    Productos
}
};

export default useProductos;