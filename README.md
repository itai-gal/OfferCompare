# CompareOffer  
A clean and focused web application that helps job seekers **save, organize, and compare multiple job offers** side-by-side, using a structured scoring system and modern UI.

## 🚀 Features
- 🔐 **Authentication** using JWT (login, register, protected routes)
- ✏️ **CRUD operations** for job offers (create, read, update, delete)
- 📊 **Offer comparison table** with scoring logic
- ⚙️ **Weighted criteria** (salary, location, work mode, etc.)
- 🎛️ **User-friendly UI** using React + TypeScript
- 🔔 **Toast notifications** for all actions (login, logout, CRUD)
- 📱 **Fully responsive layout**
- 🎨 **Structured CSS** (global + modular split)
- 👤 Personalized navbar with user greeting
- 🌐 Clean API layer with service modules

## 🧱 Tech Stack

### **Frontend**
- React + TypeScript  
- React Router  
- Context API (Auth, Toast)  
- Custom hooks  
- Modular CSS

### **Backend**
- Node.js  
- Express  
- MongoDB + Mongoose  
- JWT Authentication  
- Request validation  
- RESTful API structure  

## 📂 Project Structure

project/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.ts
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── pages/
    │   ├── services/
    │   ├── styles/
    │   ├── types/
    │   └── App.tsx
    └── package.json

## 📦 Installation & Setup

### **1️⃣ Clone the repository**
git clone https://github.com/itai-gal/compareoffer.git

### **2️⃣ Backend setup**
cd backend
npm install

Create a `.env` file:

PORT=5000
MONGO_URI=mongodb://localhost:27017/compareoffer
JWT_SECRET=your_secret_here

Run backend:
npm run dev

### **3️⃣ Frontend setup**
cd frontend
npm install
npm run dev

The app will run at:  
Frontend → http://localhost:5173  
Backend → http://localhost:5000

## 📡 API Overview

### **Auth**
| Method | Endpoint           | Description       |
|--------|--------------------|-------------------|
| POST   | /api/auth/register | Create new user   |
| POST   | /api/auth/login    | User login → JWT  |

### **Offers**
| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| GET    | /api/offers       | Get all offers (user)      |
| POST   | /api/offers       | Create a new offer         |
| GET    | /api/offers/:id   | Get single offer           |
| PUT    | /api/offers/:id   | Update an offer            |
| DELETE | /api/offers/:id   | Delete an offer            |

All offer routes require a **valid JWT token**.

## 🔒 Security Highlights
- JWT-based authentication
- Protected offer routes  
- Middleware validation  
- No sensitive data stored client-side
- Error handling across backend + frontend  


## 👤 Author

**Itai Gal**  
LinkedIn Profile: https://www.linkedin.com/in/itai-gal-894415361/

If you find this project useful — feel free to ⭐ star the repository.
