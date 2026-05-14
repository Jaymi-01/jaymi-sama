<script lang="ts">
  import { PaperPlaneTilt, GithubLogo, LinkedinLogo, TwitterLogo, CalendarBlank, WarningCircle } from 'phosphor-svelte';
  import { gsap } from 'gsap';
  import { fly } from 'svelte/transition';

  let name = $state('');
  let email = $state('');
  let message = $state('');
  let isSubmitting = $state(false);
  let submitted = $state(false);
  let errors = $state({ email: false, name: false, message: false });

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function shakeElement(id: string) {
    gsap.fromTo(`#${id}`, 
      { x: -5 }, 
      { x: 5, duration: 0.1, repeat: 5, yoyo: true, ease: "none", onComplete: () => gsap.set(`#${id}`, { x: 0 }) }
    );
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    
    // Validation
    const newErrors = {
      name: name.length < 2,
      email: !validateEmail(email),
      message: message.length < 10
    };
    
    errors = newErrors;

    if (newErrors.name) shakeElement('name');
    if (newErrors.email) shakeElement('email');
    if (newErrors.message) shakeElement('message');

    if (Object.values(newErrors).some(v => v)) return;

    isSubmitting = true;
    
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      if (response.ok) {
        submitted = true;
        name = ''; email = ''; message = '';
      } else {
        alert('Transmission failure. Check backend configuration or use social links.');
      }
    } catch (err) {
      alert('Network error. Is the backend server running? Check your connection and retry.');
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="max-w-xl w-full">
  <div class="relative">
    <div class="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
    
    {#if submitted}
      <div class="text-center py-12 space-y-6" in:fly={{opacity: 0, y: 20}}>
        <div class="p-6 bg-night-lime text-black inline-block shadow-[0_0_20px_rgba(154,221,0,0.4)]">
          <PaperPlaneTilt size={48} weight="fill" />
        </div>
        <h3 class="text-2xl font-bold uppercase text-night-lime tracking-tighter">Packet Transmitted</h3>
        <p class="text-xs text-white/50 max-w-[280px] mx-auto uppercase tracking-widest leading-loose">Communication successfully established. Awaiting response from JAYMI_SAMA.</p>
        <button onclick={() => (submitted = false)} class="text-night-pink font-bold uppercase tracking-[0.3em] text-[10px] hover:underline pt-4">Send New Packet</button>
      </div>
    {:else}
      <form onsubmit={handleSubmit} class="space-y-6">
        <div class="grid sm:grid-cols-2 gap-6">
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <label for="name" class="text-[10px] font-bold uppercase tracking-[0.3em] {errors.name ? 'text-night-pink' : 'text-white/40'}">ID_TAG</label>
              {#if errors.name}
                <span class="text-[8px] text-night-pink font-bold uppercase animate-pulse flex items-center gap-1">
                  <WarningCircle size={10} /> REQUIRED
                </span>
              {/if}
            </div>
            <input 
              id="name" 
              bind:value={name} 
              placeholder="YOUR NAME" 
              class="w-full bg-white/5 border {errors.name ? 'border-night-pink shadow-[0_0_10px_rgba(0,232,255,0.1)]' : 'border-white/10'} p-3 text-sm focus:border-night-lime outline-none transition-all font-jetbrains" 
            />
          </div>
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <label for="email" class="text-[10px] font-bold uppercase tracking-[0.3em] {errors.email ? 'text-night-pink' : 'text-white/40'}">COMMS_ADDR</label>
              {#if errors.email}
                <span class="text-[8px] text-night-pink font-bold uppercase animate-pulse flex items-center gap-1">
                  <WarningCircle size={10} /> INVALID ADDR
                </span>
              {/if}
            </div>
            <input 
              id="email" 
              bind:value={email} 
              placeholder="EMAIL@DOMAIN.COM" 
              class="w-full bg-white/5 border {errors.email ? 'border-night-pink' : 'border-white/10'} p-3 text-sm focus:border-night-lime outline-none transition-all font-jetbrains" 
            />
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label for="message" class="text-[10px] font-bold uppercase tracking-[0.3em] {errors.message ? 'text-night-pink' : 'text-white/40'}">PAYLOAD</label>
            {#if errors.message}
              <span class="text-[8px] text-night-pink font-bold uppercase animate-pulse flex items-center gap-1">
                <WarningCircle size={10} /> TOO SHORT (MIN 10)
              </span>
            {/if}
          </div>
          <textarea 
            id="message" 
            bind:value={message} 
            placeholder="ENTER ENCRYPTED MESSAGE..." 
            rows="4" 
            class="w-full bg-white/5 border {errors.message ? 'border-night-pink' : 'border-white/10'} p-3 text-sm focus:border-night-lime outline-none transition-all resize-none font-jetbrains"
          ></textarea>
        </div>

        <button type="submit" disabled={isSubmitting} class="group w-full bg-night-pink text-white py-4 font-bold uppercase tracking-[0.4em] text-xs hover:bg-night-lime hover:text-black transition-all flex items-center justify-center gap-4 disabled:opacity-50 relative overflow-hidden">
          <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          {#if isSubmitting}
            <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            TRANSMITTING...
          {:else}
            ESTABLISH LINK <PaperPlaneTilt size={18} weight="bold" class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          {/if}
        </button>
      </form>
    {/if}
  </div>

  <div class="flex gap-6 mt-12 justify-center border-t border-white/5 pt-8">
    <a href="https://github.com/Jaymi-01" target="_blank" rel="noopener noreferrer" class="text-white/40 hover:text-night-pink transition-colors"><GithubLogo size={24} /></a>
    <a href="https://www.linkedin.com/in/jaymi1001/" target="_blank" rel="noopener noreferrer" class="text-white/40 hover:text-night-pink transition-colors"><LinkedinLogo size={24} /></a>
    <a href="https://x.com/Jaymi_tsx" target="_blank" rel="noopener noreferrer" class="text-white/40 hover:text-night-pink transition-colors"><TwitterLogo size={24} /></a>
  </div>
</div>
