# 🧠 MindMate – Digital Psychological Intervention System

### 🌍 Empowering College Students to Prioritize Mental Health

---

## 🧾 Project Description

**MindMate** is an AI-driven mental health support platform designed specifically for **college students**. The system offers early intervention through AI-guided conversations, educational resources, and confidential counseling appointments.

It aims to **bridge the gap between students and mental health support** by providing accessible, stigma-free, and personalized digital assistance — helping students manage **stress, anxiety, burnout, depression, and social isolation** effectively.

---

## ❗ Problem Statement

Mental health issues like **academic stress, anxiety, and depression** have become increasingly common among students. Due to stigma, lack of awareness, or unavailability of counselors, many students **hesitate to seek help**.
This leads to declining academic performance, reduced self-esteem, and long-term emotional distress.

There is a **need for a digital-first, confidential, and approachable system** that encourages students to take the first step toward improving their mental well-being.

---

## 💡 Proposed Solution

**MindMate** provides a holistic, tech-enabled solution by combining **AI-driven support**, **counseling appointment management**, and **psychoeducational content**.

Students can chat with an **AI-based emotional support assistant** for immediate coping strategies, explore scientifically curated **mental health resources**, and **book private sessions** with counselors when needed.

---

## 🎯 Target Audience

* 🎓 **College and university students** facing academic, emotional, or social stress.
* 🧑‍🏫 **Counselors and institutions** seeking digital tools to support student well-being.

---

## ⚙️ Key Features

✅ **AI Mental Health Assistant** – Provides first-level psychological aid and coping tips using natural language understanding.
✅ **Confidential Appointment Booking** – Enables students to connect with counselors or helplines anonymously.
✅ **Resource Hub** – Offers verified educational material on stress management, mindfulness, and emotional wellness.
✅ **AI-Powered Self-Help Chatbot** – Gives instant suggestions for mood regulation, motivation, and focus.
✅ **Admin Dashboard** – Allows administrators to manage counselors, appointments, and educational resources.

---

## 🧠 Technical Approach & Tech Stack

| Layer               | Technology Used                                                               |
| ------------------- | ----------------------------------------------------------------------------- |
| **Frontend**        | React.js, Tailwind CSS                                                        |
| **Backend**         | Node.js, Express.js                                                           |
| **Database**        | MongoDB                                                                       |
| **AI Integration**  | Gemini API (for contextual understanding and emotional support conversations) |
| **Authentication**  | JWT-based user authentication                                                 |
| **Deployment**      | Vercel (Frontend), Render/Heroku (Backend)                                    |
| **Version Control** | GitHub                                                                        |

---

## 🧩 Architecture Overview

1. **Frontend (React + Tailwind)**

   * Interactive and responsive UI for students and counselors.
2. **Backend (Node + Express)**

   * REST APIs handling authentication, bookings, and chatbot queries.
3. **AI Layer (Gemini API)**

   * Processes user input and generates empathetic, context-aware responses.
4. **Database (MongoDB)**

   * Stores user details, appointments, and resource data securely.

---

## 🚀 Future Scope

* 🤖 Integration with **emotion detection** through voice or facial sentiment analysis.
* 🧘 Addition of **guided meditation and CBT-based exercises**.
* 🩺 Collaboration with certified psychologists for real-time consultations.
* 📱 Mobile app version for on-the-go accessibility.
* 🌐 Multi-language support to reach a wider audience.

---

## 🏁 Deployment

The project is live at:
👉 [https://mind-mate-eprv.vercel.app](https://mind-mate-eprv.vercel.app)

The project Live Demo Video at:
👉 [https://youtu.be/E1a19FJ-uiU](https://youtu.be/E1a19FJ-uiU)

---

## 📸 Screenshots

<img width="1909" height="904" alt="screenshot-1761749746217" src="https://github.com/user-attachments/assets/6468f71f-63ac-4fca-bb66-cfc419159608" />
<img width="1909" height="904" alt="screenshot-1761749777790" src="https://github.com/user-attachments/assets/985c9a6c-93d7-4aa1-bec8-0198cbc6e875" />
<img width="1909" height="904" alt="screenshot-1761749581780" src="https://github.com/user-attachments/assets/05c8c17b-f5b7-4c9e-b1bc-db5ed5e90b38" />
<img width="1909" height="904" alt="screenshot-1761749631357" src="https://github.com/user-attachments/assets/6fa16746-d645-4e42-8bbc-359b4edc5337" />
<img width="1909" height="904" alt="screenshot-1761749698578" src="https://github.com/user-attachments/assets/e5c094a1-f662-48ed-90b1-844868a3cc6d" />
<img width="1909" height="904" alt="screenshot-1761749719010" src="https://github.com/user-attachments/assets/8a8673cb-d352-4e8b-b990-a9972d134ebc" />



## 🪄 How to Run Locally

```bash
# Clone this repository
git clone https://github.com/PriyankaB-11/MindMate.git

# Navigate to project folder
cd MindMate

# Install dependencies
npm install

# Set environment variables (.env)
PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key

# Start the website
npm run server

```

MindMate
├─ app
│  ├─ About
│  │  ├─ loading.tsx
│  │  └─ page.tsx
│  ├─ admin
│  │  ├─ loading.tsx
│  │  ├─ login
│  │  │  └─ page.tsx
│  │  └─ page.tsx
│  ├─ api
│  │  └─ geo
│  │     └─ route.ts
│  ├─ booking
│  │  └─ page.tsx
│  ├─ checkout
│  │  ├─ loading.tsx
│  │  └─ page.tsx
│  ├─ dashboard
│  │  ├─ admin
│  │  │  ├─ layout.tsx
│  │  │  └─ page.tsx
│  │  └─ student
│  │     ├─ layout.tsx
│  │     └─ page.tsx
│  ├─ faq
│  │  └─ page.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ login
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ AI-Companion
│  │  └─ page.tsx
│  ├─ page.tsx
│  ├─ resources
│  │  ├─ loading.tsx
│  │  └─ page.tsx
│  ├─ revisions
│  │  └─ page.tsx
│  ├─ robots.txt
│  │  └─ route.ts
│  ├─ signup
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ sitemap.xml
│  │  └─ route.ts
│  └─ t&c
│     └─ page.tsx
├─ components
│  ├─ appverse-footer.tsx
│  ├─ call-to-action.tsx
│  ├─ chatbot.tsx
│  ├─ examples-dialog.tsx
│  ├─ features.tsx
│  ├─ footer.tsx
│  ├─ header.tsx
│  ├─ hero.tsx
│  ├─ lazy-video.tsx
│  ├─ Lightning.css
│  ├─ lightning.tsx
│  ├─ logo-marquee.tsx
│  ├─ logo-section.tsx
│  ├─ order-form.tsx
│  ├─ phone-video.tsx
│  ├─ Plasma.css
│  ├─ plasma.tsx
│  ├─ pricing.tsx
│  ├─ protected-route.tsx
│  ├─ redirect-if-authenticated.tsx
│  ├─ site-header.tsx
│  ├─ theme-provider.tsx
│  ├─ ui
│  │  ├─ accordion.tsx
│  │  ├─ alert-dialog.tsx
│  │  ├─ alert.tsx
│  │  ├─ aspect-ratio.tsx
│  │  ├─ avatar.tsx
│  │  ├─ badge.tsx
│  │  ├─ breadcrumb.tsx
│  │  ├─ button.tsx
│  │  ├─ calendar.tsx
│  │  ├─ card.tsx
│  │  ├─ carousel.tsx
│  │  ├─ chart.tsx
│  │  ├─ checkbox.tsx
│  │  ├─ collapsible.tsx
│  │  ├─ command.tsx
│  │  ├─ context-menu.tsx
│  │  ├─ dialog.tsx
│  │  ├─ drawer.tsx
│  │  ├─ dropdown-menu.tsx
│  │  ├─ form.tsx
│  │  ├─ hover-card.tsx
│  │  ├─ input-otp.tsx
│  │  ├─ input.tsx
│  │  ├─ label.tsx
│  │  ├─ menubar.tsx
│  │  ├─ navigation-menu.tsx
│  │  ├─ pagination.tsx
│  │  ├─ popover.tsx
│  │  ├─ progress.tsx
│  │  ├─ radio-group.tsx
│  │  ├─ resizable.tsx
│  │  ├─ scroll-area.tsx
│  │  ├─ select.tsx
│  │  ├─ separator.tsx
│  │  ├─ sheet.tsx
│  │  ├─ sidebar.tsx
│  │  ├─ skeleton.tsx
│  │  ├─ slider.tsx
│  │  ├─ sonner.tsx
│  │  ├─ switch.tsx
│  │  ├─ table.tsx
│  │  ├─ tabs.tsx
│  │  ├─ textarea.tsx
│  │  ├─ toast.tsx
│  │  ├─ toaster.tsx
│  │  ├─ toggle-group.tsx
│  │  ├─ toggle.tsx
│  │  ├─ tooltip.tsx
│  │  ├─ use-mobile.tsx
│  │  └─ use-toast.ts
│  └─ youtube-grid.tsx
├─ components.json
├─ contexts
│  └─ auth-context.tsx
├─ files
├─ hooks
│  ├─ use-mobile.ts
│  └─ use-toast.ts
├─ lib
│  └─ utils.ts
├─ middleware.ts
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.mjs
├─ public
│  ├─ icons
│  │  ├─ favicon-dark.svg
│  │  └─ skitbit-white.svg
│  ├─ images
│  │  ├─ intuitive-1.png
│  │  ├─ intuitive-2.png
│  │  ├─ top-rated-1.png
│  │  └─ top-rated-2.png
│  ├─ placeholder-logo.png
│  ├─ placeholder-logo.svg
│  ├─ placeholder-user.jpg
│  ├─ placeholder.jpg
│  └─ placeholder.svg
├─ styles
│  └─ globals.css
├─ tailwind.config.ts
└─ tsconfig.json

```
