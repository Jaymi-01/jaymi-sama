# Jaymi OS - Interactive Portfolio

A futuristic, OS-style developer portfolio built with Svelte 5, GSAP, and Tailwind CSS.

## 🚀 Experience the "Jaymi OS" Interface

This portfolio is designed as a high-tech operating system interface, providing a tactile and immersive way to explore my work, skills, and background.

---

## 📦 Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [pnpm](https://pnpm.io/) (Preferred package manager)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Jaymi-01/jaymi-sama.git
   ```
2. Navigate to the project directory:
   ```bash
   cd jaymi-sama
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Configure environment variables:
   - Copy `.env.example` to `.env`.
   - Fill in your email credentials (`EMAIL_USER`, `EMAIL_PASS`).
5. Start the full system (Frontend + Backend):
   ```bash
   pnpm dev
   ```

---

## 🎨 Dynamic Theming System

Jaymi OS features a robust, persistent theming engine managed via a dedicated `Settings.sys` window.

- **Profiles:** Choose between **Cyber Ink** (Neon Cyan), **Classic Terminal** (Matrix Green), or **Mocha Mousse** (Cream & Terracotta).
- **Smooth Transitions:** All UI elements, including background glows and the custom cursor, transition smoothly between themes using CSS variables.
- **Persistence:** User selections are saved to `localStorage` and automatically restored on future sessions.

---

## 📧 Advanced Communication (`Secure_Link.exe`)

The contact system is built for reliability and high-tech feedback.

- **Nodemailer Backend:** Powered by a custom Express server for direct email transmission.
- **Animated Validation:** Inputs use GSAP-powered "shaking" effects and pulsing warnings to guide users through required fields.
- **Autofill Optimized:** Custom CSS ensures the sleek dark theme is maintained even when using browser autofill.
- **Success States:** Real-time feedback with an immersive "Packet Transmitted" success animation.

---

## 🎹 Immersive Audio

Experience a cinematic "Wing-a-ding" startup sequence:
- **User-Initiated Boot:** Audio unlocks via a "Power" button to comply with browser policies.
- **Synth Chime:** A multi-layered, low-pitch drone and shimmering finish generated via the Web Audio API.
- **Timed Reveal:** The sound is perfectly synchronized to the moment the desktop interface appears.

---

## 📱 Multi-Device Optimization

The interface adapts its behavior and layout based on the device category:

- **Mobile:** Windows automatically maximize for readability; icons switch to a dense grid; taskbar streamlines system info.
- **Tablet:** Windows open in a generous "floating" state to leverage the desktop metaphor; icons use a 4-column layout.
- **Desktop:** Full window management system with drag-and-drop, minimizing to title bars, and z-index focusing.
- **Touch Support:** Native touch event handling added to the window dragging logic for seamless tablet usage.

---

## 📐 Architecture & Tech Stack

- **Framework:** [Svelte 5](https://svelte.dev/) (Runes: `$state`, `$derived`, `$effect`).
- **Backend:** [Express](https://expressjs.com/) & [Nodemailer](https://nodemailer.com/).
- **Animation:** [GSAP](https://greensock.com/gsap/) for precise cursor and interaction logic.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with hardware-accelerated transitions.

