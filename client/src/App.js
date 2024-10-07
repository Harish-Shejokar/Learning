import React, { useEffect } from "react"
import './App.css';

function App() {

const url = "http://localhost:8000/rate-limit";


  const api = async () => {
    try {
      const response = await fetch(url);
    // if(!response.ok){
    //   // console.log(response);
    //   // throw new Error("Network Error")
    // } 
    const data = await response.json();
    console.log(data);
    } catch (error) {
      console.log(error);
    }
    
  }

  useEffect(()=>{
    for(let i = 0; i < 5; i++) 
      api();
  },[])

  return (
    <div className="App">
      <header className="App-header">
        hey
      </header>
    </div>
  );
}

export default App;
