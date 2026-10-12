package com.mptech.bloodbank;
import jakarta.persistence.*; import lombok.Data; import java.time.*;
@Entity @Data public class Donor {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @Column(unique=true) private String donorCode;
  private String name; private Integer age; private String gender; private String phone;
  private String bloodGroup; private LocalDate lastDonation; private LocalDateTime createdAt=LocalDateTime.now();
}
