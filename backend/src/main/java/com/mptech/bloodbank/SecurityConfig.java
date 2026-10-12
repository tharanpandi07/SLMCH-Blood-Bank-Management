package com.mptech.bloodbank;
import org.springframework.context.annotation.*; 
import org.springframework.http.HttpMethod; 
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer; 
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy; 
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder; 
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint; 
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*; 
import java.util.List;
@Configuration public class SecurityConfig {
  @Bean PasswordEncoder encoder(){ return new BCryptPasswordEncoder(); }
  @Bean SecurityFilterChain chain(HttpSecurity http,JwtFilter f) throws Exception{
    http.csrf(c->c.disable()).cors(Customizer.withDefaults())
      .sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .exceptionHandling(e->e.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
      .authorizeHttpRequests(a->a.requestMatchers("/api/auth/**").permitAll()
        .requestMatchers(HttpMethod.POST,"/api/sensor").permitAll() // protected by X-API-KEY in controller
        .anyRequest().authenticated())
      .addFilterBefore(f,UsernamePasswordAuthenticationFilter.class);
    return http.build(); }
  @Bean CorsConfigurationSource cors(){ var c=new CorsConfiguration();
    c.setAllowedOrigins(List.of("http://localhost:5173")); c.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS")); c.setAllowedHeaders(List.of("*"));
    var s=new UrlBasedCorsConfigurationSource(); s.registerCorsConfiguration("/**",c); return s; }
}
