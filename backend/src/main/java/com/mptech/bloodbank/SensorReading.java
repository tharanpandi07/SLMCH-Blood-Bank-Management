package com.mptech.bloodbank;
import jakarta.persistence.*; 
import lombok.Data; 
import java.time.LocalDateTime;
@Entity @Data @Table(indexes=@Index(name="idx_latest",columnList="storageId,recordedAt"))
public class SensorReading {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  private Long storageId;
  private Double temperature; 
  private Double humidity;
  private boolean doorOpen; 
  private boolean powerOn=true;
  private LocalDateTime recordedAt=LocalDateTime.now();
}
