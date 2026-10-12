package com.mptech.bloodbank;
import org.springframework.beans.factory.annotation.Value; 
import org.springframework.http.ResponseEntity; 
import org.springframework.web.bind.annotation.*; 
import java.util.*;
@RestController 
@RequestMapping("/api") 
public class SensorController {
  private final SensorReadingRepository readings; 
  private final StorageUnitRepository storages; 
  private final String apiKey;
  public SensorController(SensorReadingRepository r,StorageUnitRepository s,@Value("${app.sensor.api-key}") String k){readings=r;storages=s;apiKey=k;}
  public record SensorReq(Long storageId,Double temperature,Double humidity,boolean doorOpen,boolean powerOn){}
  /** ESP32 / Arduino calls this every few seconds with header X-API-KEY */
  @PostMapping("/sensor") public ResponseEntity<?> ingest(@RequestHeader(value="X-API-KEY",required=false) String key,@RequestBody SensorReq r){
    if(!apiKey.equals(key)) return ResponseEntity.status(401).body(Map.of("error","bad api key"));
    var s=new SensorReading(); s.setStorageId(r.storageId()); s.setTemperature(r.temperature()); s.setHumidity(r.humidity());
    s.setDoorOpen(r.doorOpen()); s.setPowerOn(r.powerOn()); readings.save(s); return ResponseEntity.ok(Map.of("saved",true)); }
  /** Screen 5: latest reading per fridge + alert flag (safe temp 2-6C) */
  @GetMapping("/storage/latest") 
  public List<Map<String,Object>> latest(){
    List<Map<String,Object>> out=new ArrayList<>();
    for(var st:storages.findAll()){ var o=readings.findTopByStorageIdOrderByRecordedAtDesc(st.getId()); Map<String,Object> m=new LinkedHashMap<>();
      m.put("storageId",st.getId()); m.put("name",st.getName());
      o.ifPresent(x->{ m.put("temperature",x.getTemperature()); m.put("humidity",x.getHumidity()); m.put("doorOpen",x.isDoorOpen());
        m.put("powerOn",x.isPowerOn()); m.put("recordedAt",x.getRecordedAt());
        m.put("alert",x.getTemperature()==null||x.getTemperature()<2||x.getTemperature()>6||!x.isPowerOn()); });
      out.add(m); } return out; }
}
