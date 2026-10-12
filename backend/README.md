# Blood Bank API (Spring Boot 3 + JPA + JWT + MySQL)
1. Edit src/main/resources/application.properties (MySQL password, jwt secret, sensor key)
2. mvn spring-boot:run   -> tables auto-created (ddl-auto=update), default staff / staff123
3. Endpoints
 - POST /api/auth/login {username,password} -> {token}
 - POST /api/donors {name,age,gender,phone,bloodGroup} -> {donor,unit}  (use donorCode/unitCode for barcode+QR)
 - GET  /api/inventory/units | /stock | /near-expiry?days=7
 - POST /api/inventory/issue/{group}   (FIFO)
 - POST /api/sensor  (header X-API-KEY) {storageId,temperature,humidity,doorOpen,powerOn}
 - GET  /api/storage/latest
All except /api/auth/** and POST /api/sensor need header: Authorization: Bearer <token>
