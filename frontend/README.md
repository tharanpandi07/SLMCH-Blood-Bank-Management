# Blood Bank UI - separated React pages

Pages:
- Login.jsx + Login.css
- Overview.jsx + Overview.css
- RegisterDonor.jsx + RegisterDonor.css
- BloodInventory.jsx + BloodInventory.css
- ColdStorage.jsx + ColdStorage.css

Shared:
- Sidebar.jsx / Sidebar.css
- Header.jsx / Header.css
- api.js
- global.css
- Layout.css

Backend integration matches the uploaded Spring Boot API:
POST /api/auth/login
POST /api/donors
GET /api/inventory/stock
GET /api/inventory/units
GET /api/inventory/near-expiry?days=7
POST /api/inventory/issue/{group}
GET /api/storage/latest

Default backend login:
staff / staff123

Run:
1. Start Spring Boot backend on http://localhost:8080
2. npm install
3. npm run dev
