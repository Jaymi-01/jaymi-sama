<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import { gsap } from 'gsap';
  import { User, Code, Envelope, FilePdf } from 'phosphor-svelte';
  
  import Taskbar from './lib/components/Taskbar.svelte';
  import DesktopIcon from './lib/components/DesktopIcon.svelte';
  import Window from './lib/components/Window.svelte';
  import Startup from './lib/components/Startup.svelte';
  import ShutdownModal from './lib/components/ShutdownModal.svelte';
  import ShutdownSequence from './lib/components/ShutdownSequence.svelte';
  
  import About from './lib/components/About.svelte';
  import Projects from './lib/components/Projects.svelte';
  import Contact from './lib/components/Contact.svelte';
  import Settings from './lib/components/Settings.svelte';
  import Terminal from './lib/components/Terminal.svelte';
  import { themeManager } from './lib/theme.svelte';
  import { Gear, TerminalWindow } from 'phosphor-svelte';

  let isBooted = $state(false);
  let isShuttingDown = $state(false);
  let isShutdownModalOpen = $state(false);
  
  const windowConfig = [
    { id: 'about', title: 'System_Info.sh', component: About, icon: User },
    { id: 'projects', title: 'Modules.bin', component: Projects, icon: Code },
    { id: 'contact', title: 'Secure_Link.exe', component: Contact, icon: Envelope },
    { id: 'terminal', title: 'Terminal.exe', component: Terminal, icon: TerminalWindow },
    { id: 'settings', title: 'Settings.sys', component: Settings, icon: Gear }
  ];

  let windows = $state(windowConfig.map(w => ({
    ...w,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10
  })));

  let maxZIndex = $state(10);
  let cursorRef = $state<HTMLElement>();
  let cursorOuterRef = $state<HTMLElement>();

  function openWindow(id: string) {
    const win = windows.find(w => w.id === id);
    if (win) {
      if (!win.isOpen) {
        win.isOpen = true;
        // Responsive auto-sizing
        if (window.innerWidth < 768) {
          win.isMaximized = true;
        } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
          // Centered floating for tablets
          win.isMaximized = false;
        }
      }
      if (win.isMinimized) win.isMinimized = false;
      focusWindow(id);
    }
  }

  function toggleWindow(id: string) {
    const win = windows.find(w => w.id === id);
    if (win) {
      if (win.isOpen && !win.isMinimized && activeWindowId === id) {
        win.isMinimized = true;
      } else {
        openWindow(id);
      }
    }
  }

  function closeWindow(id: string) {
    const win = windows.find(w => w.id === id);
    if (win) {
      win.isOpen = false;
      win.isMinimized = false;
      win.isMaximized = false;
    }
  }

  function minimizeWindow(id: string) {
    const win = windows.find(w => w.id === id);
    if (win) win.isMinimized = !win.isMinimized;
  }

  function maximizeWindow(id: string) {
    const win = windows.find(w => w.id === id);
    if (win) {
      win.isMaximized = !win.isMaximized;
      win.isMinimized = false; // Always clear minimized state when maximizing/restoring
      if (win.isMaximized) {
        focusWindow(id);
      }
    }
  }

  function focusWindow(id: string) {
    const win = windows.find(w => w.id === id);
    if (win) {
      maxZIndex += 1;
      win.zIndex = maxZIndex;
    }
  }

  // Handle Boot and Cursor Logic in $effect
  $effect(() => {
    const cRef = cursorRef;
    const coRef = cursorOuterRef;

    if (isBooted && cRef && coRef) {
      const handleMouseMove = (e: MouseEvent) => {
        gsap.to(cRef, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'none' });
        gsap.to(coRef, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power2.out' });
      };

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, [role="button"], .project-card')) {
          gsap.to(coRef, { scale: 1.4, rotation: 45, duration: 0.4, ease: 'back.out(2)' });
          gsap.to(cRef, { backgroundColor: themeManager.currentTheme.accent2, scale: 1.5, shadow: `0 0 12px ${themeManager.currentTheme.accent2}`, duration: 0.3 });
          gsap.to('.cursor-bracket', { borderColor: themeManager.currentTheme.accent2, duration: 0.3 });
        }
      };

      const handleMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, [role="button"], .project-card')) {
          gsap.to(coRef, { scale: 1, rotation: 0, duration: 0.4, ease: 'power2.out' });
          gsap.to(cRef, { backgroundColor: themeManager.currentTheme.accent1, scale: 1, shadow: `0 0 8px ${themeManager.currentTheme.accent1}`, duration: 0.3 });
          gsap.to('.cursor-bracket', { borderColor: themeManager.currentTheme.accent1, duration: 0.3 });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseover', handleMouseOver);
      window.addEventListener('mouseout', handleMouseOut);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseover', handleMouseOver);
        window.removeEventListener('mouseout', handleMouseOut);
      };
    }
  });

  function playStartupSound(audioCtx: AudioContext) {
    const now = audioCtx.currentTime;

    function playDrone(freq: number, startTime: number, duration: number, volume: number, endFreq?: number) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      if (endFreq) {
        osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration * 0.8);
      }

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.5); // Slow attack
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    }

    // "Wiiiiiiing" - A long, rising foundation (C3 -> G3)
    playDrone(130.81, now, 4.0, 0.1, 196.00); 
    
    // "aaaaa" - A soft middle layer entering later
    playDrone(261.63, now + 1.2, 3.5, 0.08); // C4
    
    // "Diiiiiinnnnng" - The high, shimmering finish
    playDrone(523.25, now + 2.0, 5.0, 0.1); // C5
    playDrone(659.25, now + 2.2, 5.0, 0.05); // E5
    playDrone(783.99, now + 2.4, 5.0, 0.03); // G5
  }

  const handleBootComplete = async (audioCtx: AudioContext) => {
    isBooted = true;
    await tick(); // Wait for DOM update
    playStartupSound(audioCtx);
  };

  const openWindows = $derived(windows.filter(w => w.isOpen));
  const activeWindowId = $derived(
    openWindows.length > 0 
      ? openWindows.reduce((prev, current) => (prev.zIndex > current.zIndex ? prev : current)).id 
      : null
  );

  function downloadResume() {
    window.open('/Joel-Miller-Resume.pdf', '_blank');
  }

  function handlePowerClick() {
    isShutdownModalOpen = true;
  }

  function handleShutdownConfirm() {
    isShutdownModalOpen = false;
    isShuttingDown = true;
  }

  function handleShutdownComplete() {
    isShuttingDown = false;
    isBooted = false;
    // Reset window states
    windows.forEach(w => {
      w.isOpen = false;
      w.isMinimized = false;
      w.isMaximized = false;
    });
  }
</script>

{#if isShuttingDown}
  <ShutdownSequence onComplete={handleShutdownComplete} />
{:else if !isBooted}
  <Startup onComplete={handleBootComplete} />
{:else}
  <div in:fade={{ duration: 1000 }} class="h-screen w-screen bg-night-black overflow-hidden relative cursor-none select-none">
    <!-- Desktop Background -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-night-pink blur-[150px] rounded-full"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-night-lime blur-[150px] rounded-full"></div>
    </div>
  
    <!-- Grid Background -->
    <div class="absolute inset-0 bg-[linear-gradient(var(--color-night-dark)_1px,transparent_1px),linear-gradient(90deg,var(--color-night-dark)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20 overflow-hidden">
      <!-- Grid Sparks -->
      <div class="grid-spark grid-spark-1"></div>
      <div class="grid-spark grid-spark-2"></div>
      <div class="grid-spark grid-spark-3"></div>
    </div>
  
    <!-- Desktop Icons -->
    <div class="absolute top-8 left-4 right-4 md:left-8 md:right-auto grid grid-cols-3 sm:grid-cols-4 md:flex md:flex-col md:flex-wrap gap-2 md:gap-4 max-h-[calc(100vh-6rem)]">
      {#each windows as win}
        <DesktopIcon title={win.title} icon={win.icon} onClick={() => openWindow(win.id)} />
      {/each}
      <DesktopIcon title="Resume.pdf" icon={FilePdf} onClick={downloadResume} />
    </div>
  
    <!-- Windows Area -->
    <div class="absolute inset-0 pointer-events-none">
      {#each windows as win}
        <div class="pointer-events-auto">
          <Window 
            title={win.title} 
            id={win.id} 
            isOpen={win.isOpen} 
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            zIndex={win.zIndex}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onMaximize={() => maximizeWindow(win.id)}
            onFocus={() => focusWindow(win.id)}
          >
            {#if win.id === 'terminal'}
              <Terminal onExecuteCommand={(id) => openWindow(id)} />
            {:else}
              <win.component />
            {/if}
          </Window>
        </div>
      {/each}
    </div>
  
    <Taskbar 
      openWindows={openWindows.map(w => ({ id: w.id, title: w.title }))} 
      activeWindowId={activeWindowId}
      onWindowClick={(id) => toggleWindow(id)} 
      onPowerClick={handlePowerClick}
    />

    <ShutdownModal 
      isOpen={isShutdownModalOpen} 
      onClose={() => (isShutdownModalOpen = false)} 
      onConfirm={handleShutdownConfirm} 
    />
  
    <!-- Custom Cursor -->
    <div bind:this={cursorRef} class="fixed w-1.5 h-1.5 bg-night-pink pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 hidden md:block shadow-[0_0_8px_var(--color-night-pink)]"></div>
    <div bind:this={cursorOuterRef} class="fixed w-8 h-8 pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2 hidden md:block">
      <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-night-pink transition-colors cursor-bracket"></div>
      <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-night-pink transition-colors cursor-bracket"></div>
      <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-night-pink transition-colors cursor-bracket"></div>
      <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-night-pink transition-colors cursor-bracket"></div>
    </div>
  </div>
{/if}

<style>
  :global(body) {
    background-color: var(--color-night-black);
    margin: 0;
    overflow: hidden;
  }

  .grid-spark {
    position: absolute;
    width: 3px;
    height: 3px;
    background: var(--color-night-pink);
    box-shadow: 0 0 10px var(--color-night-pink), 0 0 20px var(--color-night-pink);
    border-radius: 50%;
    opacity: 0;
    z-index: 1;
    transform: translate(-50%, -50%);
  }

  @keyframes spark-move-x {
    0% { left: 0%; opacity: 0; }
    5% { opacity: 1; }
    95% { opacity: 1; }
    100% { left: 100%; opacity: 0; }
  }

  @keyframes spark-move-y {
    0% { top: 0%; opacity: 0; }
    5% { opacity: 1; }
    95% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }

  .grid-spark-1 {
    top: calc(40px * 8);
    animation: spark-move-x 8s linear infinite;
    animation-delay: 1s;
  }

  .grid-spark-2 {
    left: calc(40px * 15);
    animation: spark-move-y 12s linear infinite;
    animation-delay: 4s;
  }

  .grid-spark-3 {
    top: calc(40px * 20);
    animation: spark-move-x 10s linear infinite;
    animation-delay: 7s;
  }
</style>
