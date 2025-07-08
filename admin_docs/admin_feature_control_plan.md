
# 🛡️ Admin Feature Control System

This document outlines **all possible features** that should be controlled by the Admin Panel.

Each feature has an ON/OFF toggle, allowing full flexibility in enabling or disabling functionality site-wide.

---

## ✅ Core Learning Modules (Admin Toggles)

| Section | Feature | Toggle Variable |
|---------|---------|-----------------|
| Dictionary | Show definitions, IPA, audio | `enable_dictionary` |
| Prefixes | Show prefix module | `enable_prefixes` |
| Suffixes | Show suffix module | `enable_suffixes` |
| Roots | Show root module | `enable_roots` |
| Vocabulary | Show levels: Beginning, Intermediate, Advanced | `enable_vocabulary` |
| Grammar | Show grammar lessons | `enable_grammar` |
| Spelling | Show spelling drills | `enable_spelling` |
| Rhythm | Show rhythm trainer | `enable_rhythm` |
| Pronunciation | Show pronunciation module | `enable_pronunciation` |
| Verb Forms | Show verb conjugation trainer | `enable_verbforms` |

---

## 🧠 Smart & AI Features (Admin Toggles)

| Feature | Description | Toggle Variable |
|--------|-------------|-----------------|
| Mistake Feedback | Highlight wrong vs right quiz answers | `enable_mistake_feedback` |
| GPT Smart Tutor | “Why is this wrong?” AI assistant | `enable_ai_tutor` |
| Word Recommender | Suggest related words after search | `enable_word_recommender` |
| Grammar Checker | Grammar correction assistant | `enable_grammar_assistant` |

---

## 💳 Monetization Features (Admin Toggles)

| Feature | Description | Toggle Variable |
|--------|-------------|-----------------|
| Region Pricing | Show price per user location | `enable_region_pricing` |
| Coupon System | Allow use of coupon codes | `enable_coupon_codes` |
| Partner Referral | Enable referral tracking | `enable_partner_portal` |
| School Plans | Enable teacher/school subscriptions | `enable_school_portal` |
| Invoice Download | Show invoice PDFs for purchases | `enable_invoice_export` |
| Affiliate Widget | Show onboarding/live chat widget | `enable_affiliate_widget` |

---

## 📈 System Tools & Performance (Admin Toggles)

| Feature | Description | Toggle Variable |
|--------|-------------|-----------------|
| CloudFront CDN | Use CDN for audio and assets | `enable_cdn_audio` |
| Celery Tasks | Run background tasks like reports/audio | `enable_celery` |
| WebSocket Live View | Real-time quiz or class stats | `enable_realtime_status` |
| Excel Export | Export results to CSV or XLSX | `enable_excel_export` |

---

## 🧪 Gamification & Engagement (Admin Toggles)

| Feature | Description | Toggle Variable |
|--------|-------------|-----------------|
| XP System | Enable XP points, badges, trophies | `enable_xp_system` |
| Weekly Missions | Enable gamified tasks and goals | `enable_weekly_missions` |
| Streak Tracker | Show login/quiz streaks | `enable_streaks` |
| Team Competitions | Enable battle/team leaderboard | `enable_team_competition` |

---

📌 **All toggles should be stored in a database table or config file** accessible by Admin Panel:

```json
{
  "enable_dictionary": true,
  "enable_prefixes": false,
  "enable_ai_tutor": true,
  ...
}
```

Frontend should check toggle status before displaying each feature.
Backend API should also respect toggle settings during calls.

