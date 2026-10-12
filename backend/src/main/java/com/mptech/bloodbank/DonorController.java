package com.mptech.bloodbank;
import org.springframework.transaction.annotation.Transactional;
 import org.springframework.web.bind.annotation.*; 
 import java.time.LocalDate; 
 import java.util.Map;
@RestController @RequestMapping("/api/donors") 
public class DonorController {
  private final DonorRepository donors; private final BloodUnitRepository units; private final StorageUnitRepository storages;
  public DonorController(DonorRepository d,BloodUnitRepository u,StorageUnitRepository s){donors=d;units=u;storages=s;}
  public record DonorReq(String name,Integer age,String gender,String phone,String bloodGroup){}
  /** Saves donor + creates 1 blood unit. Frontend uses donorCode / unitCode for barcode + QR. */
  @PostMapping @Transactional public Map<String,Object> add(@RequestBody DonorReq r){
    var d=new Donor(); d.setName(r.name()); d.setAge(r.age()); d.setGender(r.gender()); d.setPhone(r.phone());
    d.setBloodGroup(r.bloodGroup()); d.setLastDonation(LocalDate.now()); d=donors.save(d);
    d.setDonorCode("D"+String.format("%05d",d.getId())); donors.save(d);
    var u=new BloodUnit(); u.setDonorId(d.getId()); u.setBloodGroup(r.bloodGroup()); u.setCollectedOn(LocalDate.now());
    u.setExpiryDate(LocalDate.now().plusDays(35)); // whole blood shelf life
    Long sid = storages.findAll().stream().findFirst().map(StorageUnit::getId).orElse(null);
    u.setStorageId(sid);
    u.setUnitCode("TMP"+System.nanoTime()); u=units.save(u); u.setUnitCode("BU"+String.format("%06d",u.getId())); units.save(u);
    return Map.of("donor",d,"unit",u); }
}
