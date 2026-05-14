<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ArrowDown } from 'phosphor-svelte';

  let titleRef: HTMLElement;
  let subtitleRef: HTMLElement;
  let ctaRef: HTMLElement;

  onMount(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.from(titleRef.querySelectorAll('.char'), {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1.2
    })
    .from(subtitleRef, {
      y: 30,
      opacity: 0,
      duration: 1
    }, '-=0.8')
    .from(ctaRef, {
      y: 20,
      opacity: 0,
      duration: 0.8
    }, '-=0.5');
  });

  const name = "JAYMI SAMA";
</script>

<section id="home" class="relative h-screen w-full flex flex-col items-center justify-center text-center px-6 bg-night-black overflow-hidden">
  <!-- Subtle Neon Background Glow -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-night-pink/20 blur-[120px] rounded-full pointer-events-none"></div>

  <div bind:this={titleRef} class="overflow-hidden mb-4 z-10">
    <h1 class="text-6xl md:text-9xl font-bold tracking-tighter leading-none flex flex-wrap justify-center text-white">
      {#each name.split('') as char}
        <span class="char inline-block hover:text-night-lime transition-colors duration-300 cursor-default">{char === ' ' ? '\u00A0' : char}</span>
      {/each}
    </h1>
  </div>

  <p bind:this={subtitleRef} class="text-lg md:text-2xl max-w-2xl text-night-lime font-medium mb-12 z-10 uppercase tracking-widest">
    Creative Developer & UI Engineer crafting high-energy digital experiences.
  </p>

  <div bind:this={ctaRef} class="flex flex-col md:flex-row gap-6 z-10">
    <a
      href="#projects"
      class="bg-night-pink text-white px-8 py-4 rounded-none font-bold uppercase tracking-widest hover:bg-night-lime hover:text-night-black transition-all duration-300 shadow-[0_0_20px_rgba(255,31,138,0.4)] hover:shadow-[0_0_25px_rgba(154,221,0,0.6)]"
    >
      Explore Work
    </a>
    <a
      href="/resume.pdf"
      class="border-2 border-night-pink text-white px-8 py-4 rounded-none font-bold uppercase tracking-widest hover:border-night-lime hover:text-night-lime transition-all duration-300"
    >
      Get Resume
    </a>
  </div>

  <div class="absolute bottom-10 animate-bounce text-night-pink z-10">
    <ArrowDown size={32} />
  </div>
</section>

<style>
  .char {
    will-change: transform, opacity;
  }
</style>
