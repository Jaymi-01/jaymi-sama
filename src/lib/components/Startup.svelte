<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  interface Props {
    onComplete: () => void;
  }

  let { onComplete }: Props = $props();

  let logoRef: HTMLElement;
  let progress = $state(0);

  onMount(() => {
    // Logo animation
    gsap.fromTo(logoRef, 
      { scale: 0.8, opacity: 0, filter: 'brightness(0)' },
      { scale: 1, opacity: 1, filter: 'brightness(1)', duration: 1.5, ease: 'power4.out' }
    );

    // Progress bar
    gsap.to({ val: 0 }, {
      val: 100,
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: function() {
        progress = Math.round((this as any).targets()[0].val);
      },
      onComplete: () => {
        setTimeout(onComplete, 500);
      }
    });
  });
</script>

<div class="fixed inset-0 bg-night-black z-[100000] flex flex-col items-center justify-center p-6 md:p-8 font-jetbrains overflow-hidden">
  <!-- Logo -->
  <div bind:this={logoRef} class="mb-8 md:mb-12 relative">
    <div class="absolute inset-0 bg-night-pink blur-2xl opacity-20 animate-pulse"></div>
    <img src="/JS-favicon.png" alt="OS Logo" class="w-24 h-24 md:w-32 md:h-32 relative z-10" />
  </div>

  <!-- Progress Bar Container -->
  <div class="w-full max-w-[280px] md:max-w-sm">
    <div class="flex justify-between text-[8px] md:text-[10px] text-white/40 mb-2 uppercase tracking-widest">
      <span>Booting_Sequence</span>
      <span>{progress}%</span>
    </div>
    <div class="w-full h-1 bg-white/5 overflow-hidden">
      <div 
        class="h-full bg-night-pink shadow-[0_0_10px_#00E8FF]" 
        style="width: {progress}%"
      ></div>
    </div>
  </div>
</div>

<style>
  div {
    cursor: none;
  }
</style>
