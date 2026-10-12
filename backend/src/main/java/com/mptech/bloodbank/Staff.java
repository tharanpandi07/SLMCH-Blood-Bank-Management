package com.mptech.bloodbank;
import jakarta.persistence.*; import lombok.Data;
@Entity @Data public class Staff {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @Column(unique=true,nullable=false) private String username;
  private String passwordHash; private String role="LAB_TECH";
}
