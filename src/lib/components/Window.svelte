<script lang="ts">
  import { X, Minus, Square, CornersOut } from 'phosphor-svelte';

  interface Props {
    title: string;
    id: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
    onFocus: () => void;
    children?: import('svelte').Snippet;
  }

  let { 
    title, id, isOpen, isMinimized, isMaximized, zIndex, 
    onClose, onMinimize, onMaximize, onFocus, children 
  }: Props = $props();

  let isDragging = $state(false);
  let x = $state(100 + Math.random() * 50);
  let y = $state(100 + Math.random() * 50);

  function draggable(node: HTMLElement) {
    function handleMousedown(e: MouseEvent) {
      if (isMaximized && !isMinimized) return; // Disable dragging only when maximized and NOT minimized
      isDragging = true;
      onFocus();
    }

    function handleMousemove(e: MouseEvent) {
      if (!isDragging) return;
      x += e.movementX;
      y += e.movementY;
    }

    function handleMouseup() {
      isDragging = false;
    }

    node.addEventListener('mousedown', handleMousedown);
    window.addEventListener('mousemove', handleMousemove);
    window.addEventListener('mouseup', handleMouseup);

    return {
      destroy() {
        node.removeEventListener('mousedown', handleMousedown);
        window.removeEventListener('mousemove', handleMousemove);
        window.removeEventListener('mouseup', handleMouseup);
      }
    };
  }
</script>

{#if isOpen}
  <div
    class="fixed bg-night-black border border-white/20 shadow-2xl overflow-hidden flex flex-col
    {!isDragging ? 'transition-all duration-300' : ''}
    {isMinimized ? 'w-80 h-10 !min-w-0 !min-h-0 opacity-90 shadow-lg' : 
     isMaximized ? 'inset-0 !w-full !h-[calc(100vh-3.5rem)] !top-0 !left-0 !z-[9000]' : 
     'min-w-[300px] min-h-[200px] w-[90vw] md:w-[700px] h-[60vh] md:h-[500px] max-h-[80vh]'}"
    style={(!isMaximized || isMinimized) ? `left: ${x}px; top: ${y}px; z-index: ${zIndex};` : "z-index: 9000;"}
    onmousedown={onFocus}
    role="presentation"
  >
    <!-- Title Bar -->
    <div
      use:draggable
      class="h-10 bg-white/5 border-b border-white/10 flex items-center justify-between px-4 select-none flex-shrink-0 {(isMaximized && !isMinimized) ? 'cursor-default' : 'cursor-move'}"
    >
      <div class="flex items-center gap-2 min-w-0">
        <div class="w-3 h-3 bg-night-pink rounded-full flex-shrink-0"></div>
        <span class="text-xs font-bold uppercase tracking-widest text-white/60 font-jetbrains truncate">{title}</span>
      </div>
      <div class="flex items-center gap-3 flex-shrink-0 ml-2">
        <button 
          onclick={(e) => { e.stopPropagation(); onMinimize(); }}
          class="text-white/40 hover:text-white transition-colors"
          title="Minimize"
        >
          <Minus size={16} />
        </button>
        <button 
          onclick={(e) => { e.stopPropagation(); onMaximize(); }}
          class="text-white/40 hover:text-white transition-colors"
          title={isMaximized ? "Restore" : "Maximize"}
        >
          {#if isMaximized}
            <Square size={14} />
          {:else}
            <CornersOut size={16} />
          {/if}
        </button>
        <button 
          onclick={(e) => { e.stopPropagation(); onClose(); }} 
          class="text-white/40 hover:text-night-pink transition-colors"
          title="Close"
        >
          <X size={18} weight="bold" />
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-grow overflow-y-auto overflow-x-hidden p-6 bg-night-black/95 custom-scrollbar {isMinimized ? 'hidden' : 'block'} {isMaximized && (id === 'about' || id === 'contact') ? 'flex flex-col items-center' : ''}">
      {@render children?.()}
    </div>
  </div>
{/if}

<style>
  div {
    will-change: transform, left, top, width, height;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 2px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #00E8FF;
    border-radius: 10px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #E8D9FF;
  }
</style>
