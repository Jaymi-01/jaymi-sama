<script lang="ts">
  import { themeManager, themes } from '../theme.svelte';
  import { CheckCircle, Palette } from 'phosphor-svelte';
</script>

<div class="max-w-2xl w-full space-y-4 md:space-y-8">
  <div class="flex items-center gap-3 md:gap-4 border-b border-white/10 pb-4 md:pb-6">
    <div class="p-2 md:p-3 bg-night-pink text-white">
      <Palette size={24} class="md:hidden" weight="duotone" />
      <Palette size={32} class="hidden md:block" weight="duotone" />
    </div>
    <div>
      <h2 class="text-lg md:text-2xl font-bold uppercase tracking-tighter text-white">System Appearance</h2>
      <p class="text-[8px] md:text-xs text-white/50 uppercase tracking-widest">Select your interface profile</p>
    </div>
  </div>

  <div class="grid gap-3 md:gap-4">
    {#each themes as theme}
      <button 
        onclick={() => themeManager.setTheme(theme.name)}
        class="group p-4 md:p-6 bg-white/5 border {themeManager.currentTheme.name === theme.name ? 'border-night-lime' : 'border-white/10'} flex items-center justify-between hover:border-night-pink transition-all text-left"
      >
        <div class="flex items-center gap-4 md:gap-6">
          <div class="flex gap-0.5 md:gap-1 flex-shrink-0">
            <div class="w-6 h-6 md:w-8 md:h-8 border border-white/20" style="background: {theme.black}"></div>
            <div class="w-6 h-6 md:w-8 md:h-8 border border-white/20" style="background: {theme.accent1}"></div>
            <div class="w-6 h-6 md:w-8 md:h-8 border border-white/20" style="background: {theme.accent2}"></div>
          </div>
          <div class="min-w-0">
            <h3 class="text-xs md:font-bold md:uppercase md:tracking-widest text-white group-hover:text-night-pink transition-colors truncate">{theme.name}</h3>
            <p class="hidden sm:block text-[10px] text-white/40 uppercase">BG: {theme.black} | PRIMARY: {theme.accent1}</p>
          </div>
        </div>
        
        {#if themeManager.currentTheme.name === theme.name}
          <div class="text-night-lime flex items-center gap-1 md:gap-2 flex-shrink-0 ml-2">
            <span class="hidden xs:block text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Active</span>
            <CheckCircle size={16} class="md:hidden" weight="fill" />
            <CheckCircle size={20} class="hidden md:block" weight="fill" />
          </div>
        {/if}
      </button>
    {/each}
  </div>
</div>