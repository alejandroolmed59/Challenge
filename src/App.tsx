import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import axios, { AxiosResponse } from "axios";
import { Table, Button } from "reactstrap";

interface VendingSchema {
  id: string;
  name: string;
  preparation_time: number;
  thumbnail: string;
}


const App: React.FC = ()=> {
  const [dispatchCola , setCola] = useState<VendingSchema[]>([]) 
  const [vending, setVending] = useState<VendingSchema[]>([]);

  const dispatch = (candidato : VendingSchema) =>{
    if(dispatchCola.some(value=>{
      return value.id === candidato.id 
    })){
      console.log("Ya esta siendo ");
    }else{
      setCola((prevState: VendingSchema[])=>{
        return [...prevState, candidato]
      })
      const intervalo = setInterval(()=>{
        candidato.preparation_time-=1
        setCola((prevState: VendingSchema[])=>{
          return [...prevState]
        })
        if(candidato.preparation_time===0){
          clearInterval(intervalo)
        }
      }, 1000)
    }
  }

  useEffect(() => {
    axios
      .get<VendingSchema[]>("https://vending-machine-test.vercel.app/api/products")
      .then((response: AxiosResponse) => {
        setVending(response.data.data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Table dark responsive>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>preparation</th>
              <th>Despachar</th>
            </tr>
          </thead>
          <tbody>
            {vending.map((item) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.preparation_time}</td>
                  <td><Button onClick={()=> dispatch(item)}>Despachar {item.name}</Button></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </header>
    </div>
  );
}

export default App;
