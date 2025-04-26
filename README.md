# 📋 Task Tracker App

A fullstack project management application where users can create projects and track tasks — built with **Express.js**, **React.js**, **TypeScript**, **PostgreSQL (NeonDB)**, **Shadcn UI**, and deployed on **Railway**.

---

## ✨ Features

- ✅ User Authentication (JWT)
- ✅ Create up to 4 projects per user
- ✅ Create, Read, Update, Delete (CRUD) tasks inside projects
- ✅ Track task status (Todo, In Progress, Done)
- ✅ Responsive dashboard with Shadcn UI
- ✅ Secure, scalable backend with Express + TypeScript
- ✅ Hosted backend (Railway) + frontend (Vercel/Netlify/your choice)

---

## 🛠 Tech Stack

- **Frontend**: React.js, TypeScript, Vite, Shadcn UI, TailwindCSS
- **Backend**: Express.js, TypeScript, Prisma ORM
- **Database**: PostgreSQL (NeonDB via Railway)
- **Authentication**: JSON Web Tokens (JWT)
- **Hosting**: Railway (Backend), Vercel(Frontend)

---

## 📦 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/task-tracker-app.git
cd task-tracker-app
2. Install dependencies
```
Backend:
```
cd backend
npm install
```

Frontend:
```
cd frontend
npm install
```
### 3. Configure Environment Variables

Create .env files in backend folder:
```
PORT=3000
DATABASE_URL=your_neondb_postgresql_connection_url
JWT_SECRET=your_super_secret_key
```
(Remember to add ?sslmode=require if using NeonDB)

Example:
```
DATABASE_URL=postgresql://user:password@yourdb.neon.tech/dbname?sslmode=require
```

### 4. Run Locally

Backend:
```
cd backend
npm run dev
```
Frontend:
```
cd frontend
npm run dev
```
### 🏗️ Database Setup (Prisma)

If you are using Prisma, after setting .env:
```
npx prisma generate
npx prisma migrate dev --name init
```
### 🚀 Deployment
Deploy Backend to Railway
```
npm install -g @railway/cli
railway login
railway init
railway up
```
Add environment variables (DATABASE_URL, JWT_SECRET) in Railway dashboard.
Deploy Frontend (Optional)

You can deploy frontend to Vercel/Netlify easily:
```
npm run build
```
Then upload the /dist folder.

### 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests or open issues.
📄 License

This project is licensed under the MIT License.
### 🚀 Live Demo

    Backend: https://soothing-essence-production.up.railway.app/api

    Frontend: https://taskch.vercel.app