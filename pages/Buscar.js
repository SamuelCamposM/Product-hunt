import React, { useState, useEffect } from 'react'

import {useRouter} from 'next/router'
import Layout from '../components/layouts/Layout'
import ProductoDetalles from "../components/layouts/ProductoDetalles";
import useProductos from '../hooks/useProductos';


const Buscar = () => {
  const [Resultados, setResultados] = useState([])
  const router = useRouter()
  const {query: {q }} = router
  

  const {Productos}   = useProductos("creado")
  
  useEffect(() => {
    if(q){
      const busqueda = q.toLocaleLowerCase();
      const filtro = Productos.filter(producto => {
        return(
          producto.nombre.toLocaleLowerCase().includes(busqueda) || 
          producto.descripcion.toLocaleLowerCase().includes(busqueda) 
        )
        
      })
      setResultados(filtro);
    }
    
    

  }, [q , Productos])
  
  return ( 
<div className="">
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg white">
              {Resultados.map(producto => (
<ProductoDetalles 
producto={producto}
key={producto.id}
/>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>

   );
}
 
export default Buscar;