package com.mptech.bloodbank;
import org.springframework.data.jpa.repository.*; 
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate; 
import java.util.List;
public interface BloodUnitRepository extends JpaRepository<BloodUnit,Long>{
  // FIFO: oldest expiry first
  List<BloodUnit> findByBloodGroupAndStatusAndExpiryDateGreaterThanEqualOrderByExpiryDateAsc(String g,String st,LocalDate d);
  List<BloodUnit> findByStatusAndExpiryDateBetweenOrderByExpiryDateAsc(String st,LocalDate a,LocalDate b);
  List<BloodUnit> findAllByOrderByExpiryDateAsc();
  @Query("select b.bloodGroup, count(b) from BloodUnit b where b.status='AVAILABLE' and b.expiryDate>=CURRENT_DATE group by b.bloodGroup")
  List<Object[]> stock();
  @Modifying @Transactional @Query("update BloodUnit b set b.status='EXPIRED' where b.status='AVAILABLE' and b.expiryDate<CURRENT_DATE")
  int markExpired();
}
