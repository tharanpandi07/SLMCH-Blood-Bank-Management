package com.mptech.bloodbank;
import jakarta.persistence.*; 
import lombok.Data; 
import java.time.LocalDate;
@Entity @Data @Table(indexes=@Index(name="idx_fifo",columnList="bloodGroup,status,expiryDate"))
public class BloodUnit {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @Column(unique=true) private String unitCode;
  private Long donorId; private String bloodGroup; private int volumeMl=450;
  private LocalDate collectedOn; private LocalDate expiryDate;
  private String status="AVAILABLE"; private Long storageId;
}
