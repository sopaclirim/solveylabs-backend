# Email Configuration Guide

## Setup Email Notifications

### 1. Gmail Setup (Rekomanduar)

**Për email: quantix.csdevs@gmail.com**

1. **Aktivizo 2-Step Verification:**
   - Shko në [Google Account Security](https://myaccount.google.com/security)
   - Aktivizo "2-Step Verification" (nëse nuk është aktivizuar)

2. **Krijo App Password:**
   - Shko në [App Passwords](https://myaccount.google.com/apppasswords)
   - Zgjidh "Mail" dhe "Other (Custom name)"
   - Shkruaj "Solvey Labs Backend"
   - Kopjo password-in që të jepet (16 karaktere, pa hapësira)
   - ⚠️ **IMPORTANTE:** Përdor App Password, JO password normal të Gmail!

3. **Konfiguro .env file:**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=quantix.csdevs@gmail.com
EMAIL_PASS=xxxx-xxxx-xxxx-xxxx
EMAIL_FROM=quantix.csdevs@gmail.com
ADMIN_EMAIL=quantix.csdevs@gmail.com
```

**Shënim:** Zëvendëso `xxxx-xxxx-xxxx-xxxx` me App Password që morët nga Google.

### 2. Si Funksionon

**Automatikisht:**
- Kur dikush dërgon contact form → Admin merr email notification
- Kur dikush dërgon application → Admin merr email notification

**Nga Admin Dashboard:**
- Shiko contact/application në dashboard
- Kliko "Send Email Reply"
- Shkruaj përgjigje dhe dërgo

### 3. Test Email

Nëse email nuk funksionon, kontrollo:
- ✅ EMAIL_HOST, EMAIL_USER, EMAIL_PASS janë të saktë
- ✅ App Password është i saktë (jo password normal)
- ✅ 2-Step Verification është aktivizuar
- ✅ Port 587 nuk është bllokuar nga firewall

### 4. Opsione të tjera

**Outlook/Hotmail:**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
```

**Yahoo:**
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
```

**Custom SMTP:**
```env
EMAIL_HOST=your-smtp-server.com
EMAIL_PORT=587
EMAIL_USER=your-username
EMAIL_PASS=your-password
```

