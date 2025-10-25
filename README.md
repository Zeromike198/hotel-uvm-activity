Hotel Activity 3.1 – Monorepo

Monorepo con backend (API Express + MongoDB) y frontend (React + Vite) para hotel: autenticación, blog, reservas y clima.

Estructura
- hotel-server: API Node/Express/Mongo
- hotel-landing: Frontend React/Vite

Requisitos
- Node 18+
- MongoDB en ejecución
- SMTP opcional para emails

Backend (hotel-server)
1) .env (deja en blanco los privados)
  MONGODB_URI=
  JWT_SECRET=
  JWT_EXPIRES_IN=24h
  SMTP_HOST=
  SMTP_PORT=
  SMTP_USER=
  SMTP_PASS=
  OPENWEATHER_API_KEY=
  PORT=3000
2) Instalar y ejecutar
  cd hotel-server
  npm install
  npm run dev
API principal
- Auth: POST /api/auth/login, GET /api/auth/profile, PUT /api/auth/change-password
- Posts: GET /api/posts, GET /api/posts/slug/:slug, POST/PUT/DELETE /api/posts (admin), GET /api/posts/:id/related, GET /api/posts/admin/stats (admin)
- Reservas: POST /api/reservations, GET /api/reservations
- Weather: GET /api/weather

Frontend (hotel-landing)
1) Instalar y ejecutar
  cd hotel-landing
  npm install
  npm run dev
2) Notas
- Vite: http://localhost:5173
- API base: http://localhost:3000/api (config en src/services/authService.js)
- Admin: usuario sembrado admin/admin123 

Reservas
- Formulario en Home envía a /api/reservations
- Se guardan en MongoDB y aparecen en Admin > Reservas
- Si SMTP está configurado se envía email de confirmación

Scripts
- Backend: npm run dev, npm start
- Frontend: npm run dev, npm run build, npm run preview

Notas
- Slug de posts se genera automáticamente; avatar de autor por defecto.
- Seeders crean admin y posts iniciales al arrancar si no existen.

