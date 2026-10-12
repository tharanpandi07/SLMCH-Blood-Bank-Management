package com.mptech.bloodbank;
import org.springframework.http.ResponseEntity; 
import org.springframework.security.crypto.password.PasswordEncoder; 
import org.springframework.web.bind.annotation.*; 
import java.util.Map;
@RestController @RequestMapping("/api/auth") 
public class AuthController {
  private final StaffRepository repo; private final PasswordEncoder enc; private final JwtUtil jwt;
  public AuthController(StaffRepository r,PasswordEncoder e,JwtUtil j){repo=r;enc=e;jwt=j;}
  public record LoginReq(String username,String password){}
  @PostMapping("/login") public ResponseEntity<?> login(@RequestBody LoginReq r){
    return repo.findByUsername(r.username()).filter(s->enc.matches(r.password(),s.getPasswordHash()))
      .<ResponseEntity<?>>map(s->ResponseEntity.ok(Map.of("token",jwt.generate(s.getUsername(),s.getRole()),"username",s.getUsername())))
      .orElse(ResponseEntity.status(401).body(Map.of("error","Wrong username/password"))); }
}
