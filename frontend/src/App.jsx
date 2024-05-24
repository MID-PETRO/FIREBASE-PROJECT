import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Card from "./components/Card";

const App = () => {
  const [productos, setProductos] = useState([]);

  const onSearch = () => {
    axios("https://dummyjson.com/products")
      .then(({ data }) => {
        if (data.products) {
          setProductos((lista) => [...lista, ...data.products]);
        }
        console.log(data.products);
      })
      .catch(() => {
        alert("esos productos no se encuentran disponibles");
      });
  };

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <div>
      <h1>lista de productos</h1>
      <div>
        {productos.map((producto, index) => {
          return (
            <Card
              key={index}
              id={producto.id}
              title={producto.title}
              image={producto.images[0]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
