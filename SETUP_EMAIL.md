# 📧 Konfigurim Email për quantix.csdevs@gmail.com

## Hapat për të konfiguruar email-in:

### 1. Aktivizo 2-Step Verification (nëse nuk është aktivizuar)
- Shko në: https://myaccount.google.com/security
- Aktivizo "2-Step Verification"

### 2. Krijo App Password
- Shko në: https://myaccount.google.com/apppasswords
- Zgjidh:
  - **App:** Mail
  - **Device:** Other (Custom name)
  - **Name:** Solvey Labs Backend
- Kliko "Generate"
- **Kopjo password-in** (16 karaktere, si: `abcd efgh ijkl mnop`)

### 3. Shto në .env file

Hap `.env` file në `solveylabs-backend` dhe shto këto rreshta:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=quantix.csdevs@gmail.com
EMAIL_PASS=abcd-efgh-ijkl-mnop
EMAIL_FROM=quantix.csdevs@gmail.com
ADMIN_EMAIL=quantix.csdevs@gmail.com
```

**⚠️ IMPORTANTE:**
- Zëvendëso `abcd-efgh-ijkl-mnop` me App Password që morët nga Google
- Hiq hapësirat nga App Password (nëse ka)
- Përdor App Password, JO password normal të Gmail!

### 4. Restart backend server

Pas konfigurimit, restart backend:
```bash
npm run dev
```

### 5. Test

Tani mund të testosh:
- Dërgo një contact form nga frontend → duhet të marrësh email notification
- Dërgo një application → duhet të marrësh email notification
- Nga admin dashboard, kliko "Send Email Reply" → duhet të dërgojë email

---

## Nëse nuk funksionon:

1. ✅ Kontrollo që 2-Step Verification është aktivizuar
2. ✅ Kontrollo që App Password është i saktë (16 karaktere)
3. ✅ Kontrollo që në `.env` file nuk ka hapësira ose karaktere të panevojshme
4. ✅ Restart backend server pas ndryshimeve
5. ✅ Kontrollo console për error messages

