package com.mptech.bloodbank;
import io.jsonwebtoken.Jwts; 
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value; 
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey; 
import java.nio.charset.StandardCharsets; 
import java.util.Date;
@Component public class JwtUtil {
  private final SecretKey key; private final long hours;
  public JwtUtil(@Value("${app.jwt.secret}") String s,@Value("${app.jwt.expiry-hours}") long h){
    key=Keys.hmacShaKeyFor(s.getBytes(StandardCharsets.UTF_8)); hours=h; }
  public String generate(String user,String role){
    return Jwts.builder().subject(user).claim("role",role).issuedAt(new Date())
      .expiration(new Date(System.currentTimeMillis()+hours*3600_000)).signWith(key).compact(); }
  public String[] parse(String t){ var c=Jwts.parser().verifyWith(key).build().parseSignedClaims(t).getPayload();
    return new String[]{c.getSubject(),c.get("role",String.class)}; }
}
