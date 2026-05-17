<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { Power } from 'phosphor-svelte';

  interface Props {
    onComplete: () => void;
  }

  let { onComplete }: Props = $props();
  let dots = $state('');

  onMount(() => {
    let count = 0;
    const dotInterval = setInterval(() => {
      count = (count + 1) % 4;
      dots = '.'.repeat(count);
    }, 500);

    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // 3 second shutdown sequence

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  });
</script>

<div 
  out:fade={{ duration: 800 }}
  class="fixed inset-0 bg-night-black z-[100000] flex flex-col items-center justify-center gap-8 font-jetbrains"
>
  <div class="relative">
    <div class="w-20 h-20 rounded-full border-2 border-night-pink/20 flex items-center justify-center animate-pulse">
      <Power size={40} weight="bold" class="text-night-pink drop-shadow-[0_0_12px_var(--color-night-pink)]" />
    </div>
    <!-- Spinning border -->
    <div class="absolute inset-0 border-2 border-transparent border-t-night-pink rounded-full animate-spin"></div>
  </div>

  <div class="flex flex-col items-center gap-2">
    <span class="text-xs font-bold uppercase tracking-[0.4em] text-white/80">
      Terminating Session{dots}
    </span>
    <span class="text-[10px] uppercase tracking-widest text-white/30">
      Saving system state...
    </span>
  </div>
</div>
