import React, { useEffect, useState } from "react";
import { AlertTriangle, PackageOpen } from "lucide-react";
import { api, groups } from "./api";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Layout.css";
import "./BloodInventory.css";

function InventoryTable({units,onIssue}){
  return <div className="inventory-table-wrap">
    <table className="inventory-table">
      <thead><tr><th>UNIT CODE</th><th>BLOOD</th><th>DONOR ID</th><th>COLLECTED</th><th>EXPIRY</th><th>STATUS</th><th>ACTION</th></tr></thead>
      <tbody>
        {units.map(u=><tr key={u.id}>
          <td><strong>{u.unitCode}</strong></td>
          <td><span className="inventory-blood">{u.bloodGroup}</span></td>
          <td>#{u.donorId}</td>
          <td>{u.collectedOn}</td>
          <td>{u.expiryDate}</td>
          <td><span className={`inventory-status ${u.status==="AVAILABLE"?"available":u.status==="ISSUED"?"issued":"expired"}`}>{u.status}</span></td>
          <td>{u.status==="AVAILABLE" && <button className="issue-btn" onClick={()=>onIssue(u.bloodGroup)}>Issue</button>}</td>
        </tr>)}
        {!units.length&&<tr><td colSpan="7" className="inventory-empty">No blood units found.</td></tr>}
      </tbody>
    </table>
  </div>
}

export default function BloodInventory(){
  const [units,setUnits]=useState([]);
  const [near,setNear]=useState([]);
  const [filter,setFilter]=useState("ALL");
  const [error,setError]=useState("");
  const [message,setMessage]=useState("");

  async function load(){
    try{
      const [u,n]=await Promise.all([api("/inventory/units"),api("/inventory/near-expiry?days=7")]);
      setUnits(u);setNear(n);setError("");
    }catch(e){setError(e.message)}
  }
  useEffect(()=>{load()},[]);

  const shown=filter==="ALL"?units:filter==="NEAR"?near:units.filter(u=>u.bloodGroup===filter);

  async function issue(group){
    if(!window.confirm(`Issue one ${group} unit using FIFO?`))return;
    try{
      await api(`/inventory/issue/${encodeURIComponent(group)}`,{method:"POST"});
      setMessage(`One ${group} unit issued using FIFO.`);
      await load();
    }catch(e){setError(e.message)}
  }

  return <div className="app-shell"><Sidebar/><main className="page">
    <Header title="Blood inventory" subtitle="Track every unit from collection to issue."/>
    {error&&<div className="page-error">{error}</div>}
    {message&&<div className="page-success">{message}</div>}

    <div className="inventory-toolbar">
      <div className="inventory-filters">
        <button className={filter==="ALL"?"selected":""} onClick={()=>setFilter("ALL")}>All</button>
        {groups.map(g=><button key={g} className={filter===g?"selected":""} onClick={()=>setFilter(g)}>{g}</button>)}
        <button className={filter==="NEAR"?"selected":""} onClick={()=>setFilter("NEAR")}><AlertTriangle size={14}/> Near expiry</button>
      </div>
      <span className="unit-count">{shown.length} units</span>
    </div>

    <section className="inventory-card card">
      <div className="inventory-card-head">
        <div><h2>Blood units</h2><p>FIFO order — earliest expiry appears first.</p></div>
        <PackageOpen size={23} color="#8c959e"/>
      </div>
      <InventoryTable units={shown} onIssue={issue}/>
    </section>
  </main></div>
}
