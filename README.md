# ⚙️ SmartDo Backend

This is the Express.js backend for **SmartDo**, a smart to-do list generator. It supports authentication via Google and GitHub, interacts with a PostgreSQL database hosted on [Neon.tech](https://neon.tech), and uses cookie-based sessions for secure user login.

---

## 🚀 Features

- ✅ OAuth Authentication with **Google** & **GitHub**
- 🔐 Secure Sessions using HTTP-only cookies
- 🧠 Integrates with **Sree GPT API** to generate smart to-do lists
- 💾 PostgreSQL Database integration (via `pg` and **Neon**)
- 🧪 Optional query performance timing
- 🔧 Built with **Express.js** and **ES Modules**

---

## 📁 Folder Structure

smartDo-backend/
├── src/
│ ├── config/ # Environment config and DB connection
│ ├── routes/ # Express routes (auth, tasks, user)
│ ├── middleware/ # Middleware for auth, logging
│ ├── controllers/ # Handlers for routes
│ ├── index.js # Main server entry
├── .env
├── .gitignore
├── package.json
├── README.m


---

## 🔑 Authentication

### Providers

- **Google**: `/auth/google`
- **GitHub**: `/auth/github`

### Session

- Authenticated users are stored in a session cookie
- Cookies are HTTP-only and expire after **7 days**

---

## 🗃️ Database

- **PostgreSQL** hosted on **Neon.tech**
- Secure connection with `sslmode=require`
- Uses `pg` with connection pooling

## 🌍 Deployment Notes

If deploying on platforms like **Render**, **Railway**, or **Vercel**:

- Ensure all **environment variables** are correctly set
- **CORS** must allow your frontend URL
- Set cookies with `secure: true` when using **HTTPS** in production

---

## ✅ API Routes

| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| GET    | /auth/google     | Redirects to Google login |
| GET    | /auth/github     | Redirects to GitHub login |
| GET    | /auth/me         | Returns logged-in user    |
| POST   | /api/tasks       | Save a generated task     |
| GET    | /api/tasks       | Fetch user's saved tasks  |
| DELETE | /api/tasks/:id   | Delete specific task      |
| POST   | /logout          | Clears session cookie     |

---

## 🔒 Security Notes

- Cookies are **HTTP-only** (not accessible via JavaScript)
- OAuth credentials are **never exposed** to the frontend
- Always use **HTTPS** in production environments

---

## 👥 Contributing

Pull requests and collaborators are welcome!  
Feel free to **fork** the repo and open a **pull request** to suggest improvements or new features.
