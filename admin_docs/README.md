
# 📘 English Dictionary Platform

Welcome to the Brilliant English Dictionary full-stack platform.
This system includes dictionary data, grammar engine, quizzes, AI tools, certification, admin dashboards, and more.

---

## 📁 Project Structure

### 🔹 `backend/`
Contains the Django backend, including:
- Dictionary engine
- Grammar tagging engine
- User authentication
- Certification system
- Analytics and logs
- Admin APIs

### 🔹 `backend/dictionary/settings/`
- `grammar_models.py` — Grammar lesson structure
- `grammar_analytics.py` — Progress and score logging
- `grammar_path_assigner.py` — Grammar path assignment
- `user_submitted_examples.py` — Crowdsourced examples
- `certificate_log.py` — Certificate download logs
- `certificate_verify_log.py` — Verification logs

### 🔹 `backend/dictionary/engine/`
- `grammar_tag_engine.py` — Tags grammar in sentences
- `grammar_quiz_templates.py` — Quiz patterns per rule
- `grammar_dict_integration.py` — Inject grammar into dictionary
- `grammar_pdf_summary.py` — Grammar report PDF
- `grammar_certificate_custom.py` — Certificate with ID
- `certificate_id_generator.py` — Format: `CERT-YYYY-ID`
- `grammar_certificate_qr.py` — QR-enabled PDF
- `class_certificate_batch.py` — ZIP batch export for schools

### 🔹 `backend/dictionary/views/`
- `grammar_path_view.py` — Grammar path API
- `user_examples_view.py` — Submissions API
- `grammar_leaderboard_view.py` — Leaderboard by usage
- `verify_certificate.py` — Public verification route

### 🔹 `backend/dictionary/tasks/`
- `send_grammar_reports.py` — Email grammar reports
- `email_certificate.py` — Email certificate to user
- `remind_expiring_certificates.py` — 1-year expiry reminders

---

### 🔹 `frontend/src/pages/`
- `GrammarLessonAdminPanel.jsx`
- `GrammarPathManager.jsx`
- `UserSubmittedExamples.jsx`
- `GrammarLeaderboard.jsx`
- `GrammarUsageChart.jsx`
- `GrammarExampleApproval.jsx`
- `StudentCertificatePanel.jsx`
- `CertificateVerifyPage.jsx`

---

### 🔹 `mobile/`
Contains React Native mobile app shell (Expo-ready)

---

### 🔹 `marketing/`
Press materials, screenshots, videos, and launch content

---

### 🔹 `.github/workflows/`
- `deploy.yml` — CI/CD for Vercel + Railway

---

### 🔹 Docs
- `press-kit.md`
- `onboarding-guide.md`
- `email-templates.md`
- `testing-checklist.md`
- `Deployment_Guide.pdf`
- `README.txt`

---

## ✅ Status
All components are production-ready, scalable, and modular. Ready for:
- App stores
- Schools
- Global users

