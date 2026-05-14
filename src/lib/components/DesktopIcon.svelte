<script lang="ts">
  import { Folder } from 'phosphor-svelte';
  
  interface Props {
    title: string;
    icon: any;
    onClick: () => void;
  }

  let { title, icon: Icon, onClick }: Props = $props();
</script>

<button
  onclick={onClick}
  class="flex flex-col items-center justify-center p-2 md:p-4 w-20 h-20 md:w-24 md:h-24 hover:bg-white/10 border border-transparent hover:border-white/20 transition-all group relative"
>
  <div class="relative text-night-pink group-hover:text-night-lime transition-colors mb-2 md:mb-3 flex items-center justify-center drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]">
    <!-- Base Folder Icon -->
    <Folder size={48} weight="duotone" class="md:hidden" />
    <Folder size={56} weight="duotone" class="hidden md:block" />
    
    <!-- Overlaid Specific Icon -->
    <div class="absolute inset-0 flex items-center justify-center pt-1.5">
      <Icon size={20} weight="bold" class="md:hidden text-white transition-colors" />
      <Icon size={24} weight="bold" class="hidden md:block text-white transition-colors" />
    </div>
  </div>
  <span class="text-[9px] md:text-[11px] font-bold uppercase tracking-wider text-white text-center font-jetbrains leading-tight w-full z-10 drop-shadow-md">
    {title}
  </span>
</button>
