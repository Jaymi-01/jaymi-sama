<script lang="ts">
  import { themeManager, themes } from '../theme.svelte';
  import { CheckCircle, Palette } from 'phosphor-svelte';
</script>

<div class="max-w-2xl w-full space-y-8">
  <div class="flex items-center gap-4 border-b border-white/10 pb-6">
    <div class="p-3 bg-night-pink text-white">
      <Palette size={32} weight="duotone" />
    </div>
    <div>
      <h2 class="text-2xl font-bold uppercase tracking-tighter text-white">System Appearance</h2>
      <p class="text-xs text-white/50 uppercase tracking-widest">Select your interface profile</p>
    </div>
  </div>

  <div class="grid gap-4">
    {#each themes as theme}
      <button 
        onclick={() => themeManager.setTheme(theme.name)}
        class="group p-6 bg-white/5 border {themeManager.currentTheme.name === theme.name ? 'border-night-lime' : 'border-white/10'} flex items-center justify-between hover:border-night-pink transition-all text-left"
      >
        <div class="flex items-center gap-6">
          <div class="flex gap-1">
            <div class="w-8 h-8 border border-white/20" style="background: {theme.black}"></div>
            <div class="w-8 h-8 border border-white/20" style="background: {theme.accent1}"></div>
            <div class="w-8 h-8 border border-white/20" style="background: {theme.accent2}"></div>
          </div>
          <div>
            <h3 class="font-bold uppercase tracking-widest text-white group-hover:text-night-pink transition-colors">{theme.name}</h3>
            <p class="text-[10px] text-white/40 uppercase">BG: {theme.black} | PRIMARY: {theme.accent1}</p>
          </div>
        </div>
        
        {#if themeManager.currentTheme.name === theme.name}
          <div class="text-night-lime flex items-center gap-2">
            <span class="text-[10px] font-bold uppercase tracking-widest">Active</span>
            <CheckCircle size={20} weight="fill" />
          </div>
        {/if}
      </button>
    {/each}
  </div>

  <div class="p-4 bg-night-pink/5 border border-night-pink/20">
    <p class="text-[10px] text-night-pink font-bold uppercase tracking-widest leading-relaxed">
      // SYSTEM_NOTE: PERSISTENCE ENABLED. INTERFACE SELECTION WILL BE SAVED TO LOCAL STORAGE FOR FUTURE SESSIONS.
    </p>
  </div>
</div>