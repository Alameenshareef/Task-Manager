
# MERN Task Manager 🚀

A full-stack Task Management application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** that allows users to manage daily tasks efficiently with authentication and priority tracking.

---

## ✅ Features

- User Authentication (Register / Login)
- Create, Read, Update, Delete (CRUD) Tasks
- Task Priority Levels (Low, Medium, High)
- Due Date Tracking
- Status Management (Pending / Completed)
- Secure JWT Authentication
- Responsive UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Node Cron

---

## 📂 Project Structure

```
mern-task-manager/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Project
```
git clone <your-repo-url>
cd mern-task-manager
```

---

### 2️⃣ Backend Setup
```
cd backend
npm install
npm start
```

Create `.env` file in backend root:

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
```

---

### 3️⃣ Frontend Setup
```
cd frontend
npm install
npm run dev
```

---

## 🔗 API Endpoints

| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| POST   | /api/auth/login    | User Login          |
| POST   | /api/auth/register | User Register       |
| GET    | /api/tasks         | Fetch All Tasks     |
| POST   | /api/tasks         | Create Task         |
| PUT    | /api/tasks/:id     | Update Task         |
| DELETE | /api/tasks/:id     | Delete Task         |

---

## 🚀 Deployment

- Frontend → Vercel / Netlify
- Backend → Render / Railway
- Database → MongoDB Atlas

---

## 👤 Author

**Al Ameen Shareef**

---

## 📄 License

This project is licensed under the MIT License.

---

✅ Always continue improving by learning and practicing coding daily.
