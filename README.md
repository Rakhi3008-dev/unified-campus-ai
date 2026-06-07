# 🎓 Unified Campus Intelligence Dashboard

An AI-powered campus assistant that unifies multiple college information systems into one smart dashboard.

Instead of maintaining one large centralized database, the application uses independent backend services for different campus domains (Library, Events, Cafeteria, Academics). The AI routing layer dynamically invokes the appropriate service(s) based on the user's natural-language query and aggregates the responses into a unified interface.

---

## ✨ Features

- 📚 Independent Library Service
- 🎉 Independent Events Service
- 🍽️ Independent Cafeteria Service
- 📖 Independent Academics Service
- 🤖 AI Assistant powered by Gemini
- 🔀 Dynamic AI Routing Layer
- 🔗 Multi-service query handling
- 📊 Unified Dashboard UI
- 🔐 Student Login Authentication
- 🚫 No centralized monolithic database

---

## 🏗️ System Architecture

```
                    User
                      │
                      ▼
                 Login Page
                      │
                      ▼
        Unified Dashboard (Next.js)
                      │
                      ▼
                 AI Router
                      │
     ┌────────┬────────┬────────┬────────┐
     │        │        │        │
     ▼        ▼        ▼        ▼

 Library   Events   Menu   Academics
 Service   Service Service  Service

                      │
                      ▼

               Gemini Fallback
```

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js

### AI Integration
- Google Gemini API

### Data Storage
- JSON-based independent services

### Authentication
- Local Storage based demo login

---

## 📁 Project Structure

```
campus-ai/

├── frontend/
│   ├── app/
│   ├── login/
│   └── page.tsx
│
├── backend/
│   ├── data/
│   │   ├── books.json
│   │   ├── events.json
│   │   ├── menu.json
│   │   └── academics.json
│   │
│   ├── services/
│   │   ├── libraryService.js
│   │   ├── eventService.js
│   │   ├── menuService.js
│   │   ├── academicService.js
│   │   └── geminiService.js
│   │
│   ├── routes/
│   │   ├── chat.js
│   │   ├── dashboard.js
│   │   ├── library.js
│   │   ├── events.js
│   │   └── menu.js
│   │
│   └── server.js
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/Rakhi3008-dev/unified-campus-ai.git

cd unified-campus-ai
```

---

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

Create a `.env` file:

```
GEMINI_API_KEY=YOUR_API_KEY
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🔐 Demo Login

Student ID:

```
admin
```

Password:

```
1234
```

---

## 💬 Sample Queries

### Library

```
Is Operating Systems book available?
```

### Events

```
When is the next Hackathon?
```

### Cafeteria

```
What's today's lunch?
```

### Academics

```
What is the attendance policy?
```

### Multi-Service Query

```
Is Operating Systems book available and when is the next Hackathon?
```

### General AI Query

```
Explain Machine Learning.
```

---

## 🎯 Problem Statement Coverage

| Requirement | Status |
|------------|---------|
| Independent MCP-inspired Services | ✅ |
| AI Query Routing | ✅ |
| Unified Dashboard UI | ✅ |
| Multi-source Aggregation | ✅ |
| No Giant Central Database | ✅ |
| Authentication | ✅ |

---

## 🔮 Future Enhancements

- Real MCP Protocol Integration
- Database Support
- Student-specific Personalization
- Role-based Authentication
- Live College APIs
- Notification System
- Timetable Integration

---

## 👩‍💻 Developer

**Rakhi Jha**

Built using ❤️ with Next.js, Express.js and Gemini AI.