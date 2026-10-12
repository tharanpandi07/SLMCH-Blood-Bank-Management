package com.mptech.bloodbank;
import org.springframework.data.jpa.repository.JpaRepository; import java.util.Optional;
public interface SensorReadingRepository extends JpaRepository<SensorReading,Long>{
  Optional<SensorReading> findTopByStorageIdOrderByRecordedAtDesc(Long storageId); }
