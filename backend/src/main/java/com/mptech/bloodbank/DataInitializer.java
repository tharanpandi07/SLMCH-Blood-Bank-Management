package com.mptech.bloodbank;
import org.springframework.boot.CommandLineRunner; 
import org.springframework.context.annotation.Bean; 
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
@Configuration public class DataInitializer {
  @Bean CommandLineRunner init(StaffRepository sr,StorageUnitRepository st,PasswordEncoder enc){ return a->{
    if(sr.count()==0){ var s=new Staff(); s.setUsername("staff"); s.setPasswordHash(enc.encode("staff123")); s.setRole("ADMIN"); sr.save(s); }
    if(st.count()==0){ for(String n:new String[]{"Fridge-1","Fridge-2"}){ var u=new StorageUnit(); u.setName(n); st.save(u);} } }; }
}
