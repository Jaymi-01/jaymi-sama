<script lang="ts">
  import { PaperPlaneTilt, Envelope, GithubLogo, LinkedinLogo, TwitterLogo } from 'phosphor-svelte';

  let name = $state('');
  let email = $state('');
  let message = $state('');
  let isSubmitting = $state(false);
  let submitted = $state(false);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    isSubmitting = true;
    setTimeout(() => {
      isSubmitting = false;
      submitted = true;
      name = ''; email = ''; message = '';
    }, 1500);
  }
</script>

<div class="max-w-xl w-full">
  {#if submitted}
    <div class="text-center py-12 space-y-6">
      <div class="p-6 bg-night-lime text-black inline-block shadow-[0_0_20px_rgba(154,221,0,0.4)]">
        <PaperPlaneTilt size={48} weight="fill" />
      </div>
      <h3 class="text-2xl font-bold uppercase text-night-lime">Transmission Success</h3>
      <button onclick={() => (submitted = false)} class="text-night-pink font-bold uppercase tracking-widest text-xs hover:underline">New Transmission</button>
    </div>
  {:else}
    <form onsubmit={handleSubmit} class="space-y-6">
      <div class="grid sm:grid-cols-2 gap-6">
        <div class="space-y-1">
          <label for="name" class="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">ID</label>
          <input id="name" bind:value={name} required placeholder="NAME" class="w-full bg-white/5 border border-white/10 p-3 text-sm focus:border-night-lime outline-none transition-colors font-jetbrains" />
        </div>
        <div class="space-y-1">
          <label for="email" class="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">ADDR</label>
          <input id="email" bind:value={email} required placeholder="EMAIL" class="w-full bg-white/5 border border-white/10 p-3 text-sm focus:border-night-lime outline-none transition-colors font-jetbrains" />
        </div>
      </div>
      <div class="space-y-1">
        <label for="message" class="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">PAYLOAD</label>
        <textarea id="message" bind:value={message} required placeholder="ENTER DATA..." rows="3" class="w-full bg-white/5 border border-white/10 p-3 text-sm focus:border-night-lime outline-none transition-colors resize-none font-jetbrains"></textarea>
      </div>

      <button type="submit" disabled={isSubmitting} class="w-full bg-night-pink text-white py-4 font-bold uppercase tracking-[0.2em] text-sm hover:bg-night-lime hover:text-black transition-all flex items-center justify-center gap-4 disabled:opacity-50">
        {#if isSubmitting}
          <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        {:else}
          SYNC_DATA <PaperPlaneTilt size={18} weight="bold" />
        {/if}
      </button>
    </form>
  {/if}

  <div class="flex gap-6 mt-12 justify-center border-t border-white/5 pt-8">
    <a href="https://github.com/Jaymi-01" target="_blank" rel="noopener noreferrer" class="text-white/40 hover:text-night-pink transition-colors"><GithubLogo size={24} /></a>
    <a href="https://www.linkedin.com/in/jaymi1001/" target="_blank" rel="noopener noreferrer" class="text-white/40 hover:text-night-pink transition-colors"><LinkedinLogo size={24} /></a>
    <a href="https://x.com/Jaymi_tsx" target="_blank" rel="noopener noreferrer" class="text-white/40 hover:text-night-pink transition-colors"><TwitterLogo size={24} /></a>
  </div>
</div>
