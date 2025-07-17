# Gemini Frontend Clone - Kuvaka Tech Assignment

🚀 **Live Demo:** https://gemini-clone-nine-lovat.vercel.app/

---

## Project Overview

This is a **Gemini-style conversational AI chat frontend clone** built using **Next.js 15 (App Router)**, **Redux Toolkit**, **React Hook Form**, and **Tailwind CSS**. The app simulates an OTP login, chatroom management, AI messaging with typing indicators, image upload, infinite scroll, and various UX features.

The project demonstrates practical knowledge of modern React/Next.js, state management, form validation, accessibility, and responsive UI design.

---

## Features

### Authentication
- OTP-based login/signup flow with country code selection fetched from [restcountries.com](https://restcountries.com).
- Simulated OTP sending and verification using `setTimeout`.
- Basic validation of phone input using React Hook Form.

### Dashboard
- List of user chatrooms with search functionality (debounced).
- Create new chatrooms and delete existing ones.
- Toast notifications for key actions.
- Dark Mode toggle with `localStorage` persistence.
- Responsive and accessible UI.

### Chatroom Interface
- User and simulated AI chat messages with timestamps.
- AI typing indicator and throttled simulated replies.
- Auto-scroll to newest message on send.
- Reverse infinite scroll to fetch older messages (simulated).
- Support for image uploads with preview.
- Copy-to-clipboard on message hover.
- Loading skeletons for improved UX during data fetch.

### Global UX Features
- Mobile-first responsive design using Tailwind CSS.
- Dark Mode toggle persisted via `localStorage`.
- Toast notifications using `react-toastify`.
- Keyboard accessibility for inputs and buttons.
- Smooth transitions and animations.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **State Management:** Redux Toolkit
- **Form Handling:** React Hook Form (Zod planned for future)
- **Styling:** Tailwind CSS v4
- **Notifications:** React Toastify
- **Utility:** lodash.debounce for search
- **Deployment:** Vercel (recommended)

---

## Folder Structure

/app  
/login # OTP login page  
/dashboard # Chatroom list and management  
/chatroom/[id] # Chatroom interface  
/components  
/auth # Authentication components (CountryCodeSelect, OTPForm)  
/chat # Chat UI components (ChatInput, ChatMessage, ChatHeader, TypingIndicator)  
/common # Shared UI components (ConfirmModal, DarkModeToggle, ToastContainerWrapper)  
/redux  
authSlice.js # Authentication state slice  
chatroomsSlice.js # Chatrooms management state slice  
chatSlice.js # Chat messages state slice  
store.js # Redux store setup with localStorage persistence  
/utils  
localStorage.js # Helpers for localStorage persistence  
simulateAIReply.js # Simulated AI reply with delay  
/postcss.config.mjs # Tailwind PostCSS configuration  
/globals.css # Tailwind base styles and globals  
/layout.js # Root layout with Redux Provider and ToastContainer  

---

## Setup & Run Locally

1. Clone the repository

```bash
git clone [your repo link]
cd gemini-clone
Install dependencies

bash
Copy
Edit
npm install
# or
yarn install
Run the development server

bash
Copy
Edit
npm run dev
# or
yarn dev
Open http://localhost:3000 in your browser.

Deployment Instructions
This project is deployed on Vercel and can be easily deployed by following these steps:

Push your project to a GitHub repository.

Go to https://vercel.com and sign up/sign in.

Click New Project and import your GitHub repository.

Use the default build settings:

Framework Preset: Next.js

Build Command: npm run build

Output Directory: .next

Click Deploy.

Once deployed, update the Live Demo URL above.

Known Limitations & Future Improvements
Form validation uses basic React Hook Form rules; integration with Zod schemas is planned for enhanced validation.

Dark Mode toggle is functional but can be polished further for better UX.

Accessibility improvements such as enhanced keyboard navigation and ARIA roles are planned.

Infinite scroll optimization with event throttling/debouncing.

Image upload currently supports preview but lacks removal or editing before sending.

Contact
For any questions or feedback, reach out to me at:

Email: ujjainwalshalu@gmail.com

GitHub: https://github.com/shalu-jainwal/gemini-clone.git

Thank you for reviewing my assignment!