# Jamify 🎵

A full-stack real-time music collaboration platform where users can chat, create jam rooms, and listen to music together with synchronized playback.

Built with modern web architecture using React, Node.js, MongoDB, Socket.IO, JWT authentication, and cloud media storage.

---

## Core Features

### Authentication & Security
- JWT authentication with httpOnly cookies
- Secure login/register/logout flow
- Protected API routes with middleware authorization

### Real-Time Messaging
- One-to-one private messaging
- Group chat rooms
- Live typing indicators
- Message delivery tracking
- Read receipts
- Online/offline presence detection

### Collaborative Music Playback
- Synchronized playback across users
- Create private or group jam sessions
- Play / Pause / Seek synchronization
- Track switching in real-time
- Shared playback state maintained on server

### Social Media Features
- Upload image/video posts
- Cloudinary-based media storage
- MongoDB metadata persistence
- User profile content feed

### Scalable Architecture
- Socket.IO real-time communication
- REST API architecture
- Redux global state management
- Persistent authentication state
- Modular backend design

---

## System Architecture

```
Frontend (React + Redux)
            │
            │ HTTP + Cookies
            ▼
Backend API (Express.js)
            │
 ┌──────────┼──────────┐
 │          │          │
 ▼          ▼          ▼
MongoDB   Socket.IO   Cloudinary
(Database) Real-Time  Media Storage
```

---

## Tech Stack

| Layer | Technology |
|---------|------------|
| Frontend | React + Vite |
| State Management | Redux Toolkit |
| Backend | Node.js + Express |
| Database | MongoDB |
| Real-Time | Socket.IO |
| Authentication | JWT + Cookies |
| Media Storage | Cloudinary |
| API | REST APIs |
| Deployment | Render / Vercel |
| Styling | Tailwind CSS |

---

## Repository Structure

```bash
jamify/

backend/
 ├── config/
 ├── controllers/
 ├── middleware/
 ├── models/
 ├── playback/
 ├── routes/
 ├── socket/
 └── index.js

frontend/
 ├── src/
 │   ├── api/
 │   ├── components/
 │   ├── context/
 │   ├── hooks/
 │   ├── redux/
 │   ├── pages/
 │   └── utils/
 └── main.jsx
```

---

## Backend Architecture

The backend follows a modular layered architecture.

```
HTTP Request
      │
      ▼
Express Router
      │
      ▼
Controller Layer
      │
      ▼
Business Logic Layer
      │
      ▼
Socket Event Layer
      │
      ▼
MongoDB / Cloudinary
```

---

## Real-Time Event System

### Chat Events

```javascript
newMessage
typing
stopTyping
messagesRead
getOnlineUsers
```

### Playback Events

```javascript
playbackJoin
playbackLeave
play
pause
seek
changeTrack
nextTrack
prevTrack
playbackUpdate
```

---

## Database Design

### Collections

```text
User
Message
Conversation
GroupRoom
Post
```

Relationships:

```
User
  ├── Messages
  ├── Conversations
  ├── Posts
  └── GroupRooms
```

---

## API Endpoints

### Authentication

```http
POST /api/v1/user/register
POST /api/v1/user/login
GET  /api/v1/user/logout
```

### Messaging

```http
POST /api/v1/message/send/:receiverId
GET  /api/v1/message/:peerId
```

### Playback

```http
GET /api/v1/playback/tracks
```

### Rooms

```http
GET  /api/v1/rooms
POST /api/v1/rooms
GET  /api/v1/rooms/:id
```

### Posts

```http
GET  /api/v1/posts/me
POST /api/v1/posts
```

---

## Key Engineering Challenges Solved

### Real-Time Synchronization

Maintained consistent music playback state across multiple clients using server-authoritative synchronization.

### Socket State Management

Prevented duplicate socket connections using centralized SocketProvider architecture.

### Optimistic UI Updates

Implemented optimistic message delivery with reconciliation using clientMessageId.

### Media Storage Optimization

Separated media storage from metadata persistence using Cloudinary + MongoDB hybrid architecture.

---

## Running Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Future Improvements

- Spotify API integration
- WebRTC voice rooms
- Recommendation engine
- Redis caching layer
- Kubernetes deployment
- Microservices architecture
- Kafka event streaming

---

## Screenshots

<img width="1440" height="777" alt="Screenshot 2026-06-20 at 4 22 29 PM" src="https://github.com/user-attachments/assets/036daef9-bdec-48b1-84d4-6dd2079c75b9" />
<img width="1440" height="777" alt="Screenshot 2026-06-20 at 4 24 40 PM" src="https://github.com/user-attachments/assets/a1886004-668f-4108-b96c-e9de973b78c4" />
<img width="1440" height="776" alt="Screenshot 2026-06-20 at 4 24 26 PM" src="https://github.com/user-attachments/assets/44481368-b04f-4df8-a227-858ac95f5f05" />
<img width="1440" height="777" alt="Screenshot 2026-06-20 at 4 24 13 PM" src="https://github.com/user-attachments/assets/09669ae1-e86f-481e-90c6-fc71a983944c" />
<img width="1440" height="776" alt="Screenshot 2026-06-20 at 4 23 52 PM" src="https://github.com/user-attachments/assets/0fed830b-b7d1-47e0-993e-3d2b70bab988" />
<img width="1440" height="776" alt="Screenshot 2026-06-20 at 4 23 35 PM" src="https://github.com/user-attachments/assets/331ce0e9-2e45-4380-8f84-2bc836affe19" />
<img width="1440" height="778" alt="Screenshot 2026-06-20 at 4 23 18 PM" src="https://github.com/user-attachments/assets/0372a5ad-04a1-408f-a1bf-d2611ce76a89" />


---

## Demo

[([Add deployment link](https://jamify-nly7.onrender.com/)

---

## Learning Outcomes

This project helped me understand:

- WebSocket architecture
- Real-time distributed state synchronization
- JWT authentication flows
- Full-stack application design
- Cloud media delivery systems
- Redux state management patterns
- Production-grade API design
