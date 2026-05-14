<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { List, X } from 'phosphor-svelte';
  import { gsap } from 'gsap';

  let isOpen = $state(false);
  let navRef: HTMLElement;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  onMount(() => {
    if (navRef) {
      gsap.from(navRef, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      });
    }
  });

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];
</script>

<nav
  bind:this={navRef}
  class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 md:px-12 md:py-6"
>
  <div class="text-2xl font-bold tracking-tighter text-white">
    <a href="#home" class="hover:text-night-pink transition-colors">JAYMI.</a>
  </div>

  <!-- Desktop Links -->
  <div class="hidden md:flex space-x-8">
    {#each links as link}
      <a
        href={link.href}
        class="text-sm font-medium uppercase tracking-widest text-white hover:text-night-pink transition-colors duration-300"
      >
        {link.name}
      </a>
    {/each}
  </div>

  <!-- Mobile Toggle -->
  <button
    class="md:hidden text-white hover:text-night-pink transition-colors"
    onclick={toggleMenu}
    aria-label="Toggle Menu"
  >
    {#if isOpen}
      <X size={32} />
    {:else}
      <List size={32} />
    {/if}
  </button>

  <!-- Mobile Menu -->
  {#if isOpen}
    <div
      class="fixed inset-0 bg-night-black flex flex-col items-center justify-center space-y-8 z-40"
      transition:fade
    >
      {#each links as link}
        <a
          href={link.href}
          class="text-4xl font-bold text-white hover:text-night-pink"
          onclick={() => (isOpen = false)}
        >
          {link.name}
        </a>
      {/each}
    </div>
  {/if}
</nav>

<style>
  nav {
    background: linear-gradient(to bottom, rgba(12, 12, 12, 0.8), transparent);
    backdrop-filter: blur(8px);
  }
</style>
