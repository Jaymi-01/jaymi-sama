<script lang="ts">
  import { GithubLogo, Globe } from "phosphor-svelte";

  const projects = [
    {
      title: "Audiophile E-Commerce",
      desc: "A fullstack E-commerce website with a sleek dark-mode dashboard and real-time inventory.",
      tags: ["React", "Typescript", "Convex", "TailwindCSS"],
      github: "https://github.com/Jaymi-01/audiophile",
      demo: "https://jaymi-audiophile.vercel.app/",
    },
    {
      title: "Eventup",
      desc: "A platform designed to help hybrid-conference teams create, collaborate and celebrate together",
      tags: ["React", "Javascript", "TailwindCSS"],
      github: "https://github.com/Jaymi-01/eventup",
      demo: "https://eventup-topaz.vercel.app/",
    },
    {
      title: "Read Count",
      desc: "An online book tracker mobile application.",
      tags: ["React Native", "Expo", "Typescript", "Firebase"],
      github: "https://github.com/Jaymi-01/readcount-new",
      demo: "https://appetize.io/app/b_xicmsnlrfqiytygofqp2ep4ru4",
    },
    {
      title: "AniRent E-Commerce",
      desc: "A fullstack E-commerce designed for renting anime (both physical copies and digital access).",
      tags: ["NextJS", "Typescript", "TailwindCSS", "Firebase", "Shadcn UI", "Jikan API"],
      github: "https://github.com/Jaymi-01/anirent",
      demo: "https://anirent.vercel.app/",
    },
    {
      title: "Your Abode",
      desc: "A Peer-to-Peer Rental Marketplace eliminating intermediary fees through transparent owner-to-tenant transactions.",
      tags: ["NextJS", "Typescript", "TailwindCSS", "Convex", "Shadcn UI", "Tanstack Query", "OpenStreetMap API"],
      github: "https://github.com/Jaymi-01/your-abode",
      demo: "https://your-abode.vercel.app/",
    },
    {
      title: "Epicurean Escape By Tiara",
      desc: "A fine dining restaurant website with a sleek dashboard for managing reservations, menu items, and customer interactions.",
      tags: ["NextJS", "Typescript", "TailwindCSS", "Recharts", "Firebase", "Paystack API"],
      github: "https://github.com/Jaymi-01/epicureanescape",
      demo: "https://epicureanescapebytiara.vercel.app/",
    },
  ];
</script>

<div class="grid sm:grid-cols-2 gap-4">
  {#each projects as project, i}
    <div
      class="p-6 bg-white/5 border border-white/10 group hover:border-night-pink transition-all"
    >
      <div class="flex justify-between items-start mb-4">
        <span
          class="text-night-lime font-bold text-xs tracking-widest font-jetbrains"
          >[{i < 9 ? "0" : ""}{i + 1}]</span
        >
        <div class="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            class="text-white hover:text-night-pink transition-colors"
          >
            <GithubLogo size={20} weight="bold" />
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            class="text-white hover:text-night-pink transition-colors"
          >
            <Globe size={20} weight="bold" />
          </a>
        </div>
      </div>
      <h3
        class="text-xl font-bold mb-2 uppercase text-white group-hover:text-night-pink transition-colors"
      >
        {project.title}
      </h3>
      <p class="text-xs text-white/50 mb-4">{project.desc}</p>
      <div class="flex flex-wrap gap-2">
        {#each project.tags as tag}
          <span
            class="text-[10px] font-bold uppercase tracking-widest text-white/30"
            >{tag}</span
          >
        {/each}
      </div>
    </div>
  {/each}
</div>
