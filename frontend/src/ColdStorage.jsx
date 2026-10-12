import React, { useEffect, useState } from "react";
import { DoorOpen, Power, Refrigerator, Thermometer, Waves } from "lucide-react";
import { api } from "./api";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Layout.css";
import "./ColdStorage.css";

function StorageCard({item}){
  const alert=item.alert;
  return <section className={`storage-card card ${alert?"storage-alert":""}`}>
    <div className="storage-card-top">
      <div className="storage-title">
        <div className="large-fridge-icon"><Refrigerator size={25}/></div>
        <div><span>STORAGE UNIT</span><h2>{item.name}</h2></div>
      </div>
      <span className={`storage-state ${alert?"bad":"good"}`}>{alert?"● Alert":"● Normal"}</span>
    </div>

    <div className="temperature-block">
      <span>Temperature</span>
      <strong>{item.temperature!=null?`${item.temperature}°C`:"—"}</strong>
      <small>Safe range 2°C – 6°C</small>
    </div>

    <div className="sensor-grid">
      <div><Thermometer size={18}/><span>Temperature</span><b>{item.temperature!=null?`${item.temperature}°C`:"—"}</b></div>
      <div><Waves size={18}/><span>Humidity</span><b>{item.humidity!=null?`${item.humidity}%`:"—"}</b></div>
      <div><DoorOpen size={18}/><span>Door</span><b>{item.doorOpen?"Open":"Closed"}</b></div>
      <div><Power size={18}/><span>Power</span><b>{item.powerOn===false?"Off":"On"}</b></div>
    </div>

    <small className="last-reading">Last reading: {item.recordedAt?new Date(item.recordedAt).toLocaleString():"No reading available"}</small>
  </section>
}

export default function ColdStorage(){
  const [data,setData]=useState([]);
  const [error,setError]=useState("");

  async function load(){
    try{setData(await api("/storage/latest"));setError("")}
    catch(e){setError(e.message)}
  }
  useEffect(()=>{
    load();
    const timer=setInterval(load,15000);
    return()=>clearInterval(timer);
  },[]);

  return <div className="app-shell"><Sidebar/><main className="page">
    <Header title="Cold storage" subtitle="Monitor refrigerator temperature, humidity, power and door status."/>
    {error&&<div className="page-error">{error}</div>}
    <div className="storage-cards">
      {data.map(item=><StorageCard item={item} key={item.storageId}/>)}
      {!data.length&&!error&&<div className="card storage-empty">No storage units found.</div>}
    </div>
  </main></div>
}
