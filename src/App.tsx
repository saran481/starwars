import React,{useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import ListView from './components/ListView'
import Details from "./components/Details";
import {detailsInterFace} from './components/interfaces'

export default function App() {
  const [details,setDetails] = useState<detailsInterFace>({} as detailsInterFace)

  const handleMoreDetails = (val:detailsInterFace)=>{
    setDetails(val)
  }

  return (
    
      <Routes>
        <Route path="/" element={ <ListView handleMoreDetails ={handleMoreDetails} />}/>
        <Route path="details" element={<Details details={details}/>} />
      </Routes>
  );
}

