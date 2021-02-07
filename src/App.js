import React,{useState,useEffect} from 'react';
import './App.css';
import Login from "./Component/Login"
import Dashboard from "./Component/Dashboard"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// import {hashHistory} from "react-router";
function App() {
  const [id,setid]=useState('')

  useEffect(() => {
    const studid=localStorage.getItem('Id');
    if(studid)
    {
      setid(studid)
    }
  }, [id])
  return (
    <div className="App">
      {!id?(
        <Login setid={setid}/>
      ):(
        <Dashboard id={id} setid={setid}/>
      )}
      
      
    </div>
  );
}

export default App;
