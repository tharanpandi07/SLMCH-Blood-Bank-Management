package com.mptech.bloodbank;
import org.springframework.http.ResponseEntity; 
import org.springframework.web.bind.annotation.*; 
import org.springframework.scheduling.annotation.Scheduled;
import java.time.LocalDate; 
import java.util.*;
@RestController @RequestMapping("/api/inventory") public class InventoryController {
  private final BloodUnitRepository repo; public InventoryController(BloodUnitRepository r){repo=r;}
  @GetMapping("/units") public List<BloodUnit> all(){ return repo.findAllByOrderByExpiryDateAsc(); }
  @GetMapping("/stock") public Map<String,Object> stock(){
    Map<String,Long> m=new LinkedHashMap<>(); for(String g:List.of("A+","A-","B+","B-","AB+","AB-","O+","O-")) m.put(g,0L);
    long total=0; for(Object[] o:repo.stock()){ m.put((String)o[0],(Long)o[1]); total+=(Long)o[1]; }
    return Map.of("total",total,"byGroup",m); }
  @GetMapping("/near-expiry") public List<BloodUnit> near(@RequestParam(defaultValue="7") int days){
    return repo.findByStatusAndExpiryDateBetweenOrderByExpiryDateAsc("AVAILABLE",LocalDate.now(),LocalDate.now().plusDays(days)); }
  /** FIFO issue: always the unit with the earliest expiry */
  @PostMapping("/issue/{group}") public ResponseEntity<?> issue(@PathVariable String group){
    var l=repo.findByBloodGroupAndStatusAndExpiryDateGreaterThanEqualOrderByExpiryDateAsc(group,"AVAILABLE",LocalDate.now());
    if(l.isEmpty()) return ResponseEntity.status(404).body(Map.of("error","No stock for "+group));
    var u=l.get(0); u.setStatus("ISSUED"); return ResponseEntity.ok(repo.save(u)); }
  @Scheduled(cron="0 0 0 * * *") public void expireOld(){ repo.markExpired(); }
}
