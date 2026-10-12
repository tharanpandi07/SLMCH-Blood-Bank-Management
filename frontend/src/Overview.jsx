import React, { useEffect, useState } from "react";
import { Droplet, Clock3, Thermometer, Droplets, Refrigerator, PackageOpen } from "lucide-react";
import { api, groups } from "./api";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Layout.css";
import "./Overview.css";

function Stat({icon:Icon,tone,label,value,caption}){
  return <div className="overview-stat card">
    <div className={`overview-stat-icon ${tone}`}><Icon size={25}/></div>
    <div><p>{label}</p><strong>{value}</strong><span>{caption}</span></div>
  </div>
}

export default function Overview(){
  const [stock,setStock]=useState(null);
  const [units,setUnits]=useState([]);
  const [storage,setStorage]=useState([]);
  const [error,setError]=useState("");

  useEffect(()=>{
    Promise.all([api("/inventory/stock"),api("/inventory/units"),api("/storage/latest")])
      .then(([s,u,st])=>{setStock(s);setUnits(u);setStorage(st)})
      .catch(e=>setError(e.message));
  },[]);

  const available=units.filter(u=>u.status==="AVAILABLE");
  const expiring=available.filter(u=>{
    const d=new Date(u.expiryDate)-new Date();
    return d>=0 && d<7*86400000;
  }).length;

  return <div className="app-shell">
    <Sidebar/>
    <main className="page">
      <Header title="Hi, Staff" subtitle="Here's the current picture of your blood bank."/>
      {error && <div className="page-error">{error}</div>}

      <section className="overview-stats">
        <Stat icon={Droplet} tone="red" label="Total available" value={stock?.total ?? "—"} caption="blood units"/>
        <Stat icon={Clock3} tone="amber" label="Near expiry" value={expiring} caption="within 7 days"/>
        <Stat icon={Thermometer} tone="blue" label="Cold storage" value={storage.length} caption="units monitored"/>
        <Stat icon={Droplets} tone="green" label="Available groups" value={`${groups.filter(g=>(stock?.byGroup?.[g]||0)>0).length}/8`} caption="blood groups"/>
      </section>

      <section className="overview-grid">
        <div className="card overview-panel">
          <div className="panel-head">
            <div><h2>Blood stock</h2><p>Available units by blood group</p></div>
            <a href="/blood-inventory">View inventory →</a>
          </div>
          <div className="overview-blood-grid">
            {groups.map(g=><div className="overview-blood-card" key={g}>
              <span>{g}</span>
              <strong>{stock?.byGroup?.[g] ?? 0}</strong>
              <small>units</small>
              <div><i style={{width:`${Math.min(100,(stock?.byGroup?.[g]||0)*10)}%`}}/></div>
            </div>)}
          </div>
        </div>

        <div className="card overview-panel">
          <div className="panel-head">
            <div><h2>Cold storage</h2><p>Live fridge health</p></div>
            <a href="/cold-storage">Monitor →</a>
          </div>
          <div className="overview-storage-list">
            {storage.map(s=><div className="overview-storage" key={s.storageId}>
              <div className="storage-icon"><Refrigerator size={19}/></div>
              <div className="storage-name"><strong>{s.name}</strong><span>{s.recordedAt?new Date(s.recordedAt).toLocaleString():"No sensor reading"}</span></div>
              <b>{s.temperature!=null?`${s.temperature}°C`:"—"}</b>
              <em className={s.alert?"danger":"safe"}>{s.alert?"Alert":"Safe"}</em>
            </div>)}
          </div>
        </div>
      </section>

      <section className="card overview-recent">
        <div className="panel-head">
          <div><h2>Recent blood units</h2><p>Sorted by expiry date — FIFO ready</p></div>
          <PackageOpen size={22} color="#8b949e"/>
        </div>
        <div className="recent-table-wrap">
          <table className="recent-table">
            <thead><tr><th>UNIT CODE</th><th>BLOOD</th><th>DONOR ID</th><th>COLLECTED</th><th>EXPIRY</th><th>STATUS</th></tr></thead>
            <tbody>
              {units.slice(0,6).map(u=><tr key={u.id}>
                <td><strong>{u.unitCode}</strong></td><td><span className="blood-pill">{u.bloodGroup}</span></td>
                <td>#{u.donorId}</td><td>{u.collectedOn}</td><td>{u.expiryDate}</td>
                <td><span className={`status-pill ${u.status==="AVAILABLE"?"safe":"neutral"}`}>{u.status}</span></td>
              </tr>)}
              {!units.length && <tr><td colSpan="6" className="empty-cell">No blood units found.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
}
