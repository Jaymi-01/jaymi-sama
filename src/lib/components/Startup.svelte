<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { Power } from 'phosphor-svelte';

  interface Props {
    onComplete: (audioCtx: AudioContext) => void;
  }

  let { onComplete }: Props = $props();

  let logoRef = $state<HTMLElement>();
  let progress = $state(0);
  let isInitiated = $state(false);

  async function initiateSystem() {
    // Initialize AudioContext on user gesture to unlock it
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    isInitiated = true;
    await new Promise(r => setTimeout(r, 0)); // Wait for DOM to render the logo

    // Logo animation
    if (logoRef) {
      gsap.fromTo(logoRef, 
        { scale: 0.8, opacity: 0, filter: 'brightness(0)' },
        { scale: 1, opacity: 1, filter: 'brightness(1)', duration: 1.5, ease: 'power4.out' }
      );
    }

    // Progress bar
    gsap.to({ val: 0 }, {
      val: 100,
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: function() {
        progress = Math.round((this as any).targets()[0].val);
      },
      onComplete: () => {
        setTimeout(() => onComplete(audioCtx), 500);
      }
    });
  }
</script>

<div class="fixed inset-0 bg-night-black z-[100000] flex flex-col items-center justify-center p-6 md:p-8 font-jetbrains overflow-hidden" style="cursor: {isInitiated ? 'none' : 'auto'};">
  {#if !isInitiated}
    <button 
      onclick={initiateSystem}
      class="group flex flex-col items-center gap-6 transition-all hover:scale-110 active:scale-95 cursor-pointer"
    >
      <div class="w-24 h-24 rounded-full border-2 border-night-pink/20 flex items-center justify-center relative group-hover:border-night-pink transition-colors">
        <div class="absolute inset-0 bg-night-pink/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <Power size={48} weight="bold" class="text-night-pink group-hover:drop-shadow-[0_0_8px_var(--color-night-pink)] transition-all" />
      </div>
      <span class="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 group-hover:text-night-pink transition-colors animate-pulse">
        Initiate System
      </span>
    </button>
  {:else}
    <!-- Logo -->
    <div bind:this={logoRef} class="mb-8 md:mb-12 relative">
      <img src="/JS-favicon.png" alt="OS Logo" class="w-24 h-24 md:w-32 md:h-32 relative z-10" />
    </div>

    <!-- Progress Bar Container -->
    <div class="w-full max-w-[280px] md:max-w-sm">
      <div class="flex justify-between text-[8px] md:text-[10px] text-white/40 mb-2 uppercase tracking-widest">
        <span>Booting Sequence</span>
        <span>{progress}%</span>
      </div>
      <div class="w-full h-1 bg-white/5 overflow-hidden">
        <div 
          class="h-full bg-night-pink shadow-[0_0_10px_var(--color-night-pink)]" 
          style="width: {progress}%"
        ></div>
      </div>
    </div>
  {/if}
</div>

<style>
  div {
    cursor: auto;
  }
</style>
