<script lang="ts">
  import { Code, Palette, Rocket, Database, Globe } from 'phosphor-svelte';

  const skills = [
    { name: 'Frontend', icon: Code, desc: 'React, Next.js, TypeScript, JavaScript, Tailwind, shadcn' },
    { name: 'Backend & DB', icon: Database, desc: 'Go, Node.js, Firebase, MongoDB, SQLite' },
    { name: 'Mobile', icon: Rocket, desc: 'React Native, Cross-platform Development' },
    { name: 'Tools & VCS', icon: Globe, desc: 'Git, Workflow Optimization, Deployment' },
    { name: 'Design', icon: Palette, desc: 'Figma, GSAP, Framer Motion, Interaction' }
  ];
</script>

<div class="space-y-8 max-w-2xl w-full">
  <div class="space-y-4">
    <h2 class="text-3xl font-bold uppercase tracking-tighter text-white">
      JAYMI_SAMA
    </h2>
    <p class="text-base leading-relaxed text-white/70">
      A passionate and creative software developer with a love for building beautiful and functional web applications. I have experience in a variety of technologies, including React and Next.js. I'm always eager to learn new things and take on new challenges.
    </p>
    <p class="text-sm leading-relaxed text-white/50 italic">
      When I'm not coding, you'll probably catch me watching anime, reading novels, manhwa and manga, or playing video games.
    </p>
  </div>

  <div class="grid gap-4">
    {#each skills as skill}
      <div class="p-4 bg-white/5 border border-white/10 flex items-start gap-4 group hover:border-night-lime transition-all">
        <div class="p-2 bg-night-pink group-hover:bg-night-lime text-white group-hover:text-black transition-colors">
          <skill.icon size={24} />
        </div>
        <div>
          <h3 class="text-lg font-bold uppercase tracking-tight group-hover:text-night-lime transition-colors">{skill.name}</h3>
          <p class="text-xs text-white/50">{skill.desc}</p>
        </div>
      </div>
    {/each}
  </div>
</div>
