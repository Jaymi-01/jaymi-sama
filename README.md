# Jaymi OS - Interactive Portfolio

A futuristic, OS-style developer portfolio built with Svelte 5, GSAP, and Tailwind CSS.

## 🚀 Experience the "Cyber Ink" Interface

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
4. Start the development server:
   ```bash
   pnpm dev
   ```
5. Build for production:
   ```bash
   pnpm build
   ```

---

## 📐 Architecture Explanation

The project follows a **Component-Driven OS Metaphor** architecture, leveraging the latest features of **Svelte 5**.

### State Management (Runes)
- **$state:** Used to manage window positions (`x`, `y`), z-indices, and visibility states.
- **$derived:** Dynamically calculates the `activeWindowId` based on the highest `zIndex` among open windows.
- **$effect:** Handles global event listeners for the custom cursor and window dragging logic.

### Window System
- Each window is an instance of the `Window.svelte` component, which accepts a Svelte snippet (`children`) for its content.
- Windows are managed as an array of objects in `App.svelte`, allowing for centralized control over the desktop environment.

---

## 🎬 Animation Decisions

Animations are central to the "high-tech" feel and were chosen to balance aesthetics with responsiveness.

- **GSAP for Precision:** Used for the boot sequence and custom cursor movement where sub-pixel precision and complex easing are required.
- **CSS Transitions for UI:** Standard UI states (maximizing, minimizing) use CSS transitions for hardware-accelerated performance.
- **Grid Sparks:** Pure CSS animations were chosen for the background grid to minimize main-thread work, ensuring that background decorative elements don't interfere with foreground interactivity.

---

## ⚡ Performance Optimization Techniques

Maintaining a high frame rate while dragging windows on a complex grid was a priority.

- **Dynamic Transition Toggling:** CSS transitions are disabled on the window container during dragging (`isDragging` state). This prevents the window from "lagging" behind the cursor as the browser tries to animate the position changes.
- **Will-Change Property:** Used on moveable windows to hint to the browser's rendering engine about upcoming position changes, optimizing layer composition.
- **Event Listener Cleanup:** All window and global event listeners are meticulously cleaned up in the `onDestroy` or `return` block of `$effect` to prevent memory leaks.
- **Centering Logic Optimization:** Maximized window centering is handled via Flexbox rather than calculating offsets, reducing layout thrashing.

---

## ♿ Accessibility Considerations

While the portfolio prioritizes a visual OS metaphor, accessibility was integrated into the core components:

- **Keyboard Navigation:** All desktop icons and taskbar buttons are focusable and triggerable via the `Enter` key.
- **ARIA Roles:** Used `role="presentation"` and appropriate `aria-label` attributes on buttons to ensure screen readers can describe the window controls (minimize, maximize, close).
- **Semantic HTML:** Despite the complex layout, the structure uses semantic elements where possible to maintain document hierarchy.
- **Color Contrast:** The "Cyber Ink" theme was designed with high-contrast Neon Cyan and Soft Lavender against Deep Charcoal to ensure readability.

---

## ⚖️ Trade-offs Made

- **Custom Cursor vs. Native Latency:** A custom GSAP cursor was chosen for the "premium" feel, knowing it introduces a minor layer of complexity compared to the native OS cursor.
- **Visual Grid vs. Rendering Load:** The background grid increases the DOM element count, but this was offset by using CSS animations instead of JavaScript-driven ones.
- **Svelte 5 Early Adoption:** Choosing Svelte 5 (v5.55+) allowed for cleaner state management with Runes but required working with newer, rapidly evolving APIs.
- **Window Clipping:** To achieve the "moveable minimized" effect, minimized windows are styled as collapsed title bars rather than being completely removed from the DOM. This keeps the state alive but requires careful management of `overflow` and `height`.

