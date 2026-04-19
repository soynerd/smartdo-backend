# ⚙️ SmartDo Backend

This is the Express.js backend for **SmartDo**, a smart to-do list generator. It supports authentication via Google and GitHub, interacts with a PostgreSQL database and uses cookie-based sessions for secure user login.

---

## 🚀 Features

- ✅ OAuth Authentication with **Google** & **GitHub**
- 🔐 Secure Sessions using HTTP-only cookies
- 💾 PostgreSQL Database integration (via `pg`)
- 🧪 Optional query performance timing
- 🔧 Built with **Express.js**

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

---

## ✅ API Routes

| Method | Endpoint         | Description                                     |
| ------ | ---------------- | ----------------------------------------------- |
| GET    | /auth/google     | Redirects to Google login                       |
| GET    | /auth/github     | Redirects to GitHub login                       |
| GET    | /data/taskData   | Fetch user's saved tasks                        |
| POST   | /data/updateTask | Save a generated task                           |
| POST   | /data/deleteTask | Delete specific task                            |
| POST   | /logout          | Clears session cookie                           |
| POST   | /response        | Use Open AI text COmpletion for task generation |

---

## 🔒 Security Notes

- Cookies are **HTTP-only** (not accessible via JavaScript)
- OAuth credentials are **never exposed** to the frontend

---
