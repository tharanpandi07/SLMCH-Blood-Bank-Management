package com.mptech.bloodbank;
import jakarta.servlet.*; 
import jakarta.servlet.http.*; 
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority; 
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component; 
import org.springframework.web.filter.OncePerRequestFilter; 
import java.io.IOException; 
import java.util.List;
@Component public class JwtFilter extends OncePerRequestFilter {
  private final JwtUtil jwt; public JwtFilter(JwtUtil j){jwt=j;}
  @Override protected void doFilterInternal(HttpServletRequest req,HttpServletResponse res,FilterChain chain) throws ServletException,IOException{
    String h=req.getHeader("Authorization");
    if(h!=null&&h.startsWith("Bearer ")){
      try{ String[] c=jwt.parse(h.substring(7));
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(c[0],null,List.of(new SimpleGrantedAuthority("ROLE_"+c[1]))));
      }catch(Exception e){ /* invalid token -> stays unauthenticated -> 401 */ } }
    chain.doFilter(req,res); }
}
