<script lang="ts">
  import { X, Power } from 'phosphor-svelte';
  import { fade, scale } from 'svelte/transition';

  interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }

  let { isOpen, onClose, onConfirm }: Props = $props();
</script>

{#if isOpen}
  <div 
    transition:fade={{ duration: 200 }}
    class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[20000] flex items-center justify-center p-4"
    onclick={onClose}
    role="presentation"
  >
    <div 
      transition:scale={{ duration: 300, start: 0.9, opacity: 0 }}
      class="bg-night-black border border-white/20 p-8 max-w-sm w-full shadow-2xl relative"
      onclick={(e) => e.stopPropagation()}
      role="presentation"
    >
      <button 
        onclick={onClose}
        class="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
      >
        <X size={20} />
      </button>

      <div class="flex flex-col items-center text-center gap-6">
        <div class="w-16 h-16 rounded-full border border-night-pink/30 flex items-center justify-center bg-night-pink/5">
          <Power size={32} weight="bold" class="text-night-pink" />
        </div>

        <div class="space-y-2">
          <h2 class="text-xl font-bold text-white uppercase tracking-widest font-jetbrains">Shut Down?</h2>
          <p class="text-white/40 text-sm font-jetbrains uppercase tracking-wider">Are you sure you want to terminate the current session?</p>
        </div>

        <div class="flex gap-4 w-full">
          <button 
            onclick={onClose}
            class="flex-1 py-3 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors font-jetbrains"
          >
            Cancel
          </button>
          <button 
            onclick={onConfirm}
            class="flex-1 py-3 bg-night-pink text-white text-xs font-bold uppercase tracking-widest hover:bg-night-pink/80 transition-colors font-jetbrains shadow-[0_0_15px_rgba(255,0,128,0.3)]"
          >
            Shut Down
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
