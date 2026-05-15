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
  class="flex flex-col items-center p-2 md:p-3 w-20 md:w-28 min-h-[5rem] md:min-h-[7rem] hover:bg-white/10 border border-transparent hover:border-white/20 transition-all group relative rounded-sm"
>
  <div class="relative text-night-pink group-hover:text-night-lime transition-colors mb-2 flex items-center justify-center drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]">
    <!-- Base Folder Icon -->
    <Folder size={44} weight="duotone" class="md:hidden" />
    <Folder size={52} weight="duotone" class="hidden md:block" />
    
    <!-- Overlaid Specific Icon -->
    <div class="absolute inset-0 flex items-center justify-center pt-1">
      <Icon size={18} weight="bold" class="md:hidden text-white transition-colors" />
      <Icon size={22} weight="bold" class="hidden md:block text-white transition-colors" />
    </div>
  </div>
  <div class="w-full flex justify-center px-1">
    <span class="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white text-center font-jetbrains leading-normal w-full z-10 drop-shadow-sm break-words line-clamp-2">
      {title}
    </span>
  </div>
</button>
