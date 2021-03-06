import React from 'react'
import Layout from "../components/layouts/Layout";
import ProductoDetalles from "../components/layouts/ProductoDetalles";
import useProductos from '../hooks/useProductos';


const Home = () => {
const {Productos}   = useProductos("creado")

  return (
    <div className="">
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg white">
              {Productos.map(producto => (
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
};

export default Home;
