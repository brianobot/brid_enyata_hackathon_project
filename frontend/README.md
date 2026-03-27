# InterVerify | Business Verification & Trust Platform

InterVerify is a business verification platform designed to foster trust within the digital economy.

---

##

### Frontend Tech Stack

- React.js  
- Tailwind CSS  
- Lucide React (Icons)

### State Management

- React Context API (Authentication)

### API Client

- Axios

### Routing

- React Router v6

---

## Key Features

### 1. Dynamic Dashboard & Verification Flow

- Multi-Step Verification (5-step form)

### 2. Search & Discovery

- Live search directory
- Search-as-you-type dropdown
- Public business profiles

### 3. Authentication & Security

- Protected routes
- Axios interceptors

---

## 🔧 Technical Challenges & Fixes

- Backend migration issues → Fixed with proper baseURL
- CORS errors → Resolved via whitelist
- UI crashes → Fixed with optional chaining + loading states
- Search relevance → Improved with client-side filtering
- Public route bug → Fixed interceptor logic

---

## UI/UX Enhancements

- Glassmorphism navbar
- Improved navigation flows
- Better validation and user guidance

---

## Getting Started

```bash
git clone https://github.com/brianobot/brid_enyata_hackathon_project/tree/master/frontend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file:

``` bash
VITE_API_BASE_URL=https://brid-enyata-hackathon-project.onrender.com/api/v1
```

---

## API Integration Map

| Feature | Endpoint | Method | Description |
| -------- | ---------- | -------- | ------------ |
| Auth | /v1/auth/token | POST | Get JWT |
| Profile | /v1/auth/me | GET | Get user |
| Signup | /v1/auth/signup | POST | Register |
| Search | /v1/businesses/search | GET | Find businesses |
| Verification | /v1/verification/submit | POST | Submit data |
| Public | /v1/businesses/{id} | GET | Public profile |

---

## Future Roadmap

- Real-time notifications
- Advanced analytics dashboard
- Reviews & recommendations
- Monetization (premium tiers)

---

## 👨‍💻 Author

Idongesit Inyang (ID. Inyang)  
Software Engineer
