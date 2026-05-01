<div align="center">

<img src="frontend/public/placeholder-logo.png" alt="KhelSetu Logo" width="80" />

# 🏆 KhelSetu — AI-Powered Sports Assessment Platform

**Empowering Indian Athletes with Computer Vision & AI**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.19-FF6F00?style=for-the-badge&logo=tensorflow)](https://tensorflow.org/)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-0.10-4285F4?style=for-the-badge&logo=google)](https://mediapipe.dev/)
[![React Native](https://img.shields.io/badge/React_Native-Expo-61DAFB?style=for-the-badge&logo=react)](https://expo.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

[Live Demo](#) · [API Docs](http://localhost:8000/docs) · [Report Bug](https://github.com/MaulshreeJ/Khel-Setu/issues) · [Request Feature](https://github.com/MaulshreeJ/Khel-Setu/issues)

---

![KhelSetu Banner](frontend/public/indian-athletes-training-together-in-diverse-sport.jpg)

</div>

---

## 📖 What is KhelSetu?

**KhelSetu** (खेल सेतु — "Bridge to Sports") is a full-stack AI-powered sports assessment platform built for Indian athletes. It uses **real-time computer vision** via MediaPipe and OpenCV to analyze athletic performance directly from a webcam — no expensive equipment, no gym required.

Athletes record short videos of their exercises. KhelSetu's AI engine processes the footage, counts reps, measures hold times, estimates jump heights, and delivers instant feedback — all saved to a personal dashboard with performance trends and national leaderboard rankings.

> Built for the **15,000+ aspiring athletes** across India who lack access to professional sports assessment infrastructure.

---

## ✨ Features

### 🤖 AI-Powered Live Assessments
| Test | Method | Output |
|------|--------|--------|
| **Squat Counter** | MediaPipe Pose — knee angle tracking | Rep count + form feedback |
| **Push-Up Counter** | MediaPipe Pose — elbow angle tracking | Rep count + form feedback |
| **Plank Hold Timer** | MediaPipe Pose — body alignment detection | Hold time in seconds |
| **Vertical Jump** | MediaPipe Pose — hip displacement tracking | Estimated height in cm |
| **Shuttle Run** | GPS + accelerometer (mobile) | Time in seconds |
| **12-Minute Run** | GPS tracking (mobile) | Distance in metres |
| **Sit & Reach** | Pose estimation + depth estimation | Reach distance in cm |

### 📊 Athlete Dashboard
- Real-time performance charts (6-month trends)
- Test distribution breakdown by category
- National leaderboard with rank tracking
- Achievement badges and milestone system
- Animated stat counters (total tests, avg score, streak)

### 🔐 Authentication
- Phone number + password based auth
- JWT token authentication (7-day sessions)
- Secure bcrypt password hashing
- Protected routes with automatic redirect

### 📱 Cross-Platform
- **Web App** — Next.js 14 with full responsive design
- **Mobile App** — React Native (Expo) for Android & iOS
- **REST API** — FastAPI backend with auto-generated Swagger docs

### 🧠 ML & Computer Vision
- MediaPipe Pose for 33-landmark body tracking
- OpenCV for video frame processing
- TensorFlow 2.19 for advanced model inference
- Keras for custom model training pipeline
- Vertical jump height estimation via hip displacement analysis

---

## 🏗️ Architecture

```
KhelSetu/
├── frontend/          # Next.js 14 Web Application
│   ├── app/           # App Router pages
│   │   ├── /                    # Landing page
│   │   ├── /auth                # Login & Signup
│   │   ├── /dashboard           # Athlete dashboard
│   │   ├── /tests               # Test catalogue
│   │   ├── /live-assessment     # AI Squat assessment
│   │   ├── /assessment-pushup   # AI Push-up assessment
│   │   ├── /assessment-plank    # AI Plank assessment
│   │   ├── /assessment-vertical-jump  # AI Jump assessment
│   │   ├── /resources           # Training resources
│   │   └── /about               # About page
│   ├── components/    # Reusable UI components (shadcn/ui)
│   └── lib/           # API client, utilities
│
├── backend/           # FastAPI Python Backend
│   └── app/
│       ├── api/v1/    # REST API endpoints
│       │   ├── auth.py          # Login, signup, /me
│       │   └── assessments.py   # Video upload & results
│       ├── core/
│       │   ├── cv_analyzer.py   # MediaPipe + OpenCV engine
│       │   └── security.py      # JWT + bcrypt
│       ├── db/
│       │   ├── models.py        # SQLAlchemy ORM models
│       │   └── session.py       # DB connection (SQLite/PostgreSQL)
│       └── schemas/             # Pydantic request/response models
│
├── KhelSetu/          # React Native Mobile App (Expo)
│   └── src/
│       ├── screens/   # App screens
│       └── components/# UI components
│
└── ml-training/       # ML model training scripts
    ├── data_collection.py
    └── vertical_jump/train_model.py
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or pnpm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/MaulshreeJ/Khel-Setu.git
cd Khel-Setu
```

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies (includes TensorFlow, MediaPipe, OpenCV)
pip install -r requirements.txt

# Create environment file
echo "USE_SQLITE=true" > app/.env
echo "SECRET_KEY=your-secret-key-here" >> app/.env

# Start the server
cd app
uvicorn main:app --reload --port 8000
```

Backend runs at **http://localhost:8000**  
API docs at **http://localhost:8000/docs**

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at **http://localhost:3000**

### 4. Mobile App Setup (Optional)

```bash
cd KhelSetu

# Install dependencies
npm install

# Start Expo
npx expo start
```

Scan the QR code with **Expo Go** on your phone.

---

## 🔌 API Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auth/signup` | Register new athlete |
| `POST` | `/api/v1/auth/login` | Login (returns JWT) |
| `GET`  | `/api/v1/auth/me` | Get current user profile |

### Assessments
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/assessments/upload-video` | Squat AI analysis |
| `POST` | `/api/v1/assessments/upload-video-pushup` | Push-up AI analysis |
| `POST` | `/api/v1/assessments/upload-video-plank` | Plank AI analysis |
| `POST` | `/api/v1/assessments/upload-video-vertical-jump` | Vertical jump AI analysis |
| `GET`  | `/api/v1/assessments/my-results` | Get athlete's results history |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/health` | Server health check |

All protected endpoints require `Authorization: Bearer <token>` header.

---

## 🧪 How the AI Works

### Pose Estimation Pipeline

```
Video Upload → Frame Extraction → MediaPipe Pose Detection
     → 33 Landmark Coordinates → Angle Calculation → Rep/Hold Logic
          → Result + Feedback → Save to DB → Return to Frontend
```

### Exercise Detection Logic

**Squats** — Tracks `LEFT_HIP → LEFT_KNEE → LEFT_ANKLE` angle
- `angle > 160°` → standing (UP stage)
- `angle < 100°` → deep squat (DOWN stage) → counter++

**Push-Ups** — Tracks `LEFT_SHOULDER → LEFT_ELBOW → LEFT_WRIST` angle
- `angle > 160°` → arms extended (UP stage)
- `angle < 90°` → chest down (DOWN stage) → counter++

**Plank** — Checks `SHOULDER → HIP → ANKLE` body alignment
- `body_angle > 150°` AND body is horizontal → plank frame counted
- Total plank frames ÷ video FPS = hold time in seconds

**Vertical Jump** — Tracks `LEFT_HIP` Y-coordinate across all frames
- Baseline = 75th percentile of hip Y positions (standing)
- Jump height = `(baseline_Y - min_Y) × 170cm`

---

## 🗄️ Database Schema

```
athletes
  ├── id (UUID)
  ├── phone_number (unique)
  ├── full_name
  ├── date_of_birth
  ├── gender
  └── hashed_password

athlete_assessments
  ├── id (UUID)
  ├── athlete_id → athletes.id
  ├── status (pending/completed)
  └── started_at

assessment_results
  ├── id (UUID)
  ├── assessment_id → athlete_assessments.id
  ├── test_id → assessment_tests.id
  ├── recorded_value (reps / seconds / cm)
  └── ai_analysis_data (JSON)

assessment_tests
  ├── id
  ├── name
  ├── unit (reps / seconds / cm / metres)
  └── benchmark_data (JSON)
```

Supports both **SQLite** (local dev) and **PostgreSQL** (production) via environment variable.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 14.2 | React framework with App Router |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| shadcn/ui | latest | UI component library |
| Recharts | latest | Performance charts |
| React Hook Form | 7 | Form management |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| FastAPI | 0.116 | REST API framework |
| SQLAlchemy | 2.0 | ORM |
| MediaPipe | 0.10 | Pose estimation |
| OpenCV | 4.11 | Video processing |
| TensorFlow | 2.19 | ML inference |
| Keras | 3.11 | Model training |
| Pydantic | 2.11 | Data validation |
| JWT (python-jose) | 3.5 | Authentication |
| bcrypt | 4.3 | Password hashing |

### Mobile
| Technology | Version | Purpose |
|-----------|---------|---------|
| React Native | 0.81 | Mobile framework |
| Expo | 54 | Development platform |
| React Navigation | 6 | Navigation |

---

## 📸 Screenshots

| Landing Page | Dashboard | Live Assessment |
|---|---|---|
| ![Home](frontend/public/placeholder.jpg) | ![Dashboard](frontend/public/placeholder.jpg) | ![Assessment](frontend/public/placeholder.jpg) |

| Tests Catalogue | Auth Page | Results |
|---|---|---|
| ![Tests](frontend/public/placeholder.jpg) | ![Auth](frontend/public/placeholder.jpg) | ![Results](frontend/public/placeholder.jpg) |

---

## 🗺️ Roadmap

- [x] User authentication (phone + password)
- [x] AI squat counter (MediaPipe)
- [x] AI push-up counter (MediaPipe)
- [x] AI plank hold timer (MediaPipe)
- [x] AI vertical jump estimator (MediaPipe)
- [x] Athlete dashboard with charts
- [x] National leaderboard
- [x] Achievement system
- [x] React Native mobile app
- [ ] Real-time webcam overlay with skeleton drawing
- [ ] Coach/scout portal with athlete management
- [ ] PDF report generation
- [ ] Push notifications for streaks
- [ ] Offline mode (mobile)
- [ ] Multi-language support (Hindi, Marathi, Tamil)
- [ ] AWS S3 video storage
- [ ] PostgreSQL production deployment

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👥 Team

Built with ❤️ for Indian athletes.

| Role | Contribution |
|------|-------------|
| Full Stack Development | Next.js frontend, FastAPI backend |
| ML / Computer Vision | MediaPipe pose pipeline, TensorFlow models |
| Mobile Development | React Native Expo app |
| UI/UX Design | shadcn/ui component system |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgements

- [MediaPipe](https://mediapipe.dev/) — Google's pose estimation framework
- [shadcn/ui](https://ui.shadcn.com/) — Beautiful UI components
- [FastAPI](https://fastapi.tiangolo.com/) — Modern Python web framework
- [Expo](https://expo.dev/) — React Native development platform

---

<div align="center">

**⭐ Star this repo if KhelSetu inspires you!**

Made with ❤️ in India 🇮🇳

</div>
