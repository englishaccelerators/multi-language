
# 🧑‍💻 Developer README – English Dictionary Platform

## 🔧 Project Overview
This is a full-stack English learning SaaS platform with:
- Dictionary (IPA, definitions, examples, audio)
- Grammar, spelling, prefixes, roots
- AI tools (GPT tutor, feedback)
- Quizzes, XP, streaks, gamification
- Stripe-based billing (region-sensitive)
- Admin Panel for total feature control
- Partner and School portals
- Built with: Django + React + PostgreSQL + AWS

## 📁 Key Folders
- `backend/` – Django project (API, models, logic)
- `frontend/` – React app (Vite-based)
- `feature_modules/` – Optional modular features by phase
- `mobile/` – React Native app (early stage)
- `developer_handoff/` – You are here

## 🔑 Admin Control
All features use toggle keys like:
```json
{ "enable_ai_tutor": true, "enable_weekly_missions": false }
```
Toggles are stored in backend (`admin_settings.py`) and synced to frontend UI (`AdminControlDashboard.jsx`).

## ⚙️ Setup Commands
```bash
# Backend
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend
cd frontend
npm install
npm run dev

# Mobile (optional)
cd mobile
npm install
npx expo start
```

## 🚫 Warning: Do Not Touch
- `ai_tools_config.json` – GPT keys or logic
- Stripe pricing logic
- Certificate generators unless you're assigned to it

