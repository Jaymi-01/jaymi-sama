<script lang="ts">
  interface Props {
    title: string;
    icon: any;
    onClick: () => void;
  }

  let { title, icon: Icon, onClick }: Props = $props();
</script>

<button
  onclick={onClick}
  class="flex flex-col items-center justify-center p-2 md:p-4 w-20 h-20 md:w-24 md:h-24 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
>
  <div class="text-night-pink group-hover:text-night-lime transition-colors mb-1 md:mb-2">
    <Icon size={32} class="md:hidden" weight="duotone" />
    <Icon size={40} class="hidden md:block" weight="duotone" />
  </div>
  <span class="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-white/70 text-center font-jetbrains leading-tight truncate w-full">
    {title}
  </span>
</button>
