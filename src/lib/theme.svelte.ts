export interface Theme {
  name: string;
  black: string;
  accent1: string; // Neon Cyan in Cyber Ink
  accent2: string; // Soft Lavender in Cyber Ink
}

export const themes: Theme[] = [
  {
    name: 'Cyber Ink',
    black: '#101014',
    accent1: '#00E8FF',
    accent2: '#E8D9FF'
  },
  {
    name: 'Terminal Phosphor',
    black: '#0D0F0D',   // Near-black green
    accent1: '#4ADE80', // Phosphor Green
    accent2: '#E8F5E8'  // Ghost White (Headings)
  },
  {
    name: 'Mocha Mousse',
    black: '#1A1412',
    accent1: '#D4A373', // Terracotta
    accent2: '#FAEDCD'  // Cream
  }
];

class ThemeManager {
  currentTheme = $state(themes[0]);

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jaymi_theme');
      if (saved) {
        const found = themes.find(t => t.name === saved);
        if (found) this.currentTheme = found;
      }
      this.applyTheme();
    }
  }

  setTheme(themeName: string) {
    const found = themes.find(t => t.name === themeName);
    if (found) {
      this.currentTheme = found;
      if (typeof window !== 'undefined') {
        localStorage.setItem('jaymi_theme', found.name);
      }
      this.applyTheme();
    }
  }

  applyTheme() {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.style.setProperty('--color-night-black', this.currentTheme.black);
    root.style.setProperty('--color-night-pink', this.currentTheme.accent1);
    root.style.setProperty('--color-night-lime', this.currentTheme.accent2);
  }
}

export const themeManager = new ThemeManager();
