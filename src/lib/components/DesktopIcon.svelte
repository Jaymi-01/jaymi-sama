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
  class="flex flex-col items-center justify-center p-4 w-24 h-24 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
>
  <div class="text-night-pink group-hover:text-night-lime transition-colors mb-2">
    <Icon size={40} weight="duotone" />
  </div>
  <span class="text-[10px] font-bold uppercase tracking-widest text-white/70 text-center font-jetbrains leading-tight">
    {title}
  </span>
</button>
