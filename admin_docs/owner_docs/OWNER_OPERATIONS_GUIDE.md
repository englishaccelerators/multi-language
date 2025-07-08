
# 👑 OWNER OPERATIONS GUIDE – English Dictionary Platform

Everything you need to manage, grow, and protect your platform — without coding.

---

## 🧠 1. SYSTEM OVERVIEW

| Layer | Toolset | Controlled by |
|-------|---------|----------------|
| 🧾 Learning Platform | Dictionary, Grammar, Vocabulary, AI Tutor | Admin Toggle |
| 🔐 Admin ERP | Roles, Feature Access, Permissions | Owner |
| 💳 Finance System | Stripe, Coupons, Refunds, Reports | Admin (Finance Role) |
| 📊 Analytics & CRM | KPI Dashboards, Audit Logs, Backups | Admin (Manager or Owner) |
| 🧠 Future Add-ons | Voice Tutor, Mobile App, Forum, CRM Export | Admin Toggle |

---

## 🛠 2. DAILY / WEEKLY OPERATIONS

| Task | Who Does It | How |
|------|-------------|-----|
| 🟢 Monitor user activity | Manager Admin | Visit KPI Dashboard (Phase 8) |
| 📤 Export finance data | Finance Admin | Use Accounting Export CSV tool |
| 🔄 Issue refunds | Finance Admin | Use RefundManager panel |
| 📚 Add/edit lessons | Content Admin | Use Grammar/Spelling CMS |
| 🧾 Check audit trail | Owner/Admin | View Audit Logs (Phase 8) |
| 📦 Monitor backups | Owner | View Backup Monitor |
| 📢 Announce new features | Owner/Admin | Use Push Campaign tool (Phase 8/7) |

---

## 📅 3. MONTHLY TASKS

| Task | Frequency | Location |
|------|-----------|----------|
| 🔐 Review Admin Access | Monthly | AdminRoleSettings Panel |
| 📊 Export KPI report | Monthly | KPI Dashboard export |
| 📦 Backup master ZIP | Monthly | Save `english-dictionary-web.zip` offline/Google Drive |
| 💳 Check Stripe payouts | Monthly | Stripe dashboard (external) |
| 🧪 Run full test checklist | Monthly | Use `testing-checklist.md` file |

---

## 🧾 4. IF YOU HIRE A DEVELOPER

| Provide | File |
|---------|------|
| Full system code | `english-dictionary-web-GOLD-HANDOFF.zip` |
| Setup guide | `SETUP_GUIDE.txt` |
| Architecture map | `ARCHITECTURE_MAP.txt` |
| Developer instructions | `README_FOR_DEVELOPERS.md` |

---

## ⚙️ 5. TROUBLESHOOTING

| Problem | Solution |
|--------|----------|
| A section isn’t showing | Check Admin Panel toggle (OFF/ON) |
| Admin can’t see a feature | Review their role permissions |
| Payment failed | Check Stripe logs or webhook log (Phase 7) |
| Backup missing | Check `backup_monitor.py` in Phase 8 |
| User can't hear audio | Confirm S3 CDN is enabled (`audio_cdn.py`) |

---

## 🧭 6. OWNER CHECKLIST (Every 3 Months)

✅ Review Admin roles and permissions  
✅ Clean up old unused content  
✅ Evaluate churn and growth from KPI dashboard  
✅ Review support questions or feedback from teachers  
✅ Ensure latest ZIP backup is stored in:
- USB
- Google Drive
- Dropbox

---
This guide ensures your system runs smoothly — even if you bring in a team.
