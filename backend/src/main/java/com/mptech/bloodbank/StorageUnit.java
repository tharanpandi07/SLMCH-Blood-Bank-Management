package com.mptech.bloodbank;
import jakarta.persistence.*; import lombok.Data;
@Entity @Data public class StorageUnit {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; private String name;
}
