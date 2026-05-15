<script lang="ts">
  import { Folder } from 'phosphor-svelte';
  
  interface Props {
    title: string;
    icon: any;
    onClick: () => void;
  }

  let { title, icon: Icon, onClick }: Props = $props();

  let x = $state(0);
  let y = $state(0);
  let isDragging = $state(false);
  let hasMoved = $state(false);
  let isMobile = $state(false);
  let startX = 0;
  let startY = 0;

  // Load saved position on mount and handle resize
  import { onMount } from 'svelte';
  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const saved = localStorage.getItem(`icon_pos_${title}`);
    if (saved) {
      const { savedX, savedY } = JSON.parse(saved);
      x = savedX;
      y = savedY;
    }

    return () => window.removeEventListener('resize', checkMobile);
  });

  function draggable(node: HTMLElement) {
    const handleStart = (clientX: number, clientY: number) => {
      if (isMobile) return;
      isDragging = true;
      hasMoved = false;
      startX = clientX;
      startY = clientY;
    };

    const handleMove = (clientX: number, clientY: number) => {
      if (!isDragging || isMobile) return;
      
      const dx = clientX - startX;
      const dy = clientY - startY;
      
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMoved = true;
      }
      
      x += dx;
      y += dy;
      startX = clientX;
      startY = clientY;
    };

    const handleEnd = () => {
      if (isDragging) {
        isDragging = false;
        if (!isMobile) {
          // Save position
          localStorage.setItem(`icon_pos_${title}`, JSON.stringify({ savedX: x, savedY: y }));
        }
      }
    };

    const onMousedown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      handleStart(e.clientX, e.clientY);
    };

    const onMousemove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onMouseup = () => handleEnd();

    const onTouchstart = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    };

    const onTouchmove = (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    const onTouchend = () => handleEnd();

    node.addEventListener('mousedown', onMousedown);
    window.addEventListener('mousemove', onMousemove);
    window.addEventListener('mouseup', onMouseup);

    node.addEventListener('touchstart', onTouchstart, { passive: false });
    window.addEventListener('touchmove', onTouchmove, { passive: false });
    window.addEventListener('touchend', onTouchend);

    return {
      destroy() {
        node.removeEventListener('mousedown', onMousedown);
        window.removeEventListener('mousemove', onMousemove);
        window.removeEventListener('mouseup', onMouseup);
        node.removeEventListener('touchstart', onTouchstart);
        window.removeEventListener('touchmove', onTouchmove);
        window.removeEventListener('touchend', onTouchend);
      }
    };
  }

  function handleClick() {
    if (!hasMoved) {
      onClick();
    }
  }
</script>

<button
  use:draggable
  onclick={handleClick}
  class="flex flex-col items-center p-2 md:p-3 w-20 md:w-28 min-h-[5rem] md:min-h-[7rem] hover:bg-white/10 border border-transparent hover:border-white/20 transition-all group relative rounded-sm select-none active:scale-95"
  style="transform: translate({isMobile ? 0 : x}px, {isMobile ? 0 : y}px); z-index: {isDragging ? 100 : 1}; cursor: {isDragging ? 'grabbing' : 'pointer'};"
>
  <div class="relative text-night-pink group-hover:text-night-lime transition-colors mb-2 flex items-center justify-center drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] pointer-events-none">
    <!-- Base Folder Icon -->
    <Folder size={44} weight="duotone" class="md:hidden" />
    <Folder size={52} weight="duotone" class="hidden md:block" />
    
    <!-- Overlaid Specific Icon -->
    <div class="absolute inset-0 flex items-center justify-center pt-1">
      <Icon size={18} weight="bold" class="md:hidden text-white transition-colors" />
      <Icon size={22} weight="bold" class="hidden md:block text-white transition-colors" />
    </div>
  </div>
  <div class="w-full flex justify-center px-1 pointer-events-none">
    <span class="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white text-center font-jetbrains leading-normal w-full z-10 drop-shadow-sm break-words line-clamp-2">
      {title}
    </span>
  </div>
</button>

<style>
  button {
    will-change: transform;
    touch-action: none;
  }
</style>
