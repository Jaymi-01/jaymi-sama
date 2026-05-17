<script lang="ts">
  import { onMount } from 'svelte';

  // State for graphs
  let cpuData = $state(new Array(20).fill(50));
  let ramData = $state(new Array(20).fill(30));
  let netData = $state(new Array(20).fill(10));

  function updateData() {
    // Simulate jittery CPU
    const nextCpu = Math.max(10, Math.min(90, cpuData[cpuData.length - 1] + (Math.random() - 0.5) * 40));
    cpuData = [...cpuData.slice(1), nextCpu];

    // Simulate steady RAM
    const nextRam = Math.max(20, Math.min(80, ramData[ramData.length - 1] + (Math.random() - 0.5) * 5));
    ramData = [...ramData.slice(1), nextRam];

    // Simulate bursty Network
    const nextNet = Math.random() > 0.8 ? Math.random() * 80 : Math.max(5, netData[netData.length - 1] - 5);
    netData = [...netData.slice(1), nextNet];
  }

  function getPath(data: number[], width: number, height: number) {
    const step = width / (data.length - 1);
    return data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${height - (d / 100) * height}`).join(' ');
  }

  onMount(() => {
    const interval = setInterval(updateData, 200);
    return () => clearInterval(interval);
  });
</script>

<div class="fixed top-8 right-8 w-48 hidden md:flex flex-col gap-6 font-jetbrains select-none pointer-events-none opacity-40 hover:opacity-100 transition-opacity duration-500 z-0">
  <!-- CPU -->
  <div class="space-y-1">
    <div class="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/50">
      <span>CPU_LOAD</span>
      <span class="text-night-pink">{Math.round(cpuData[cpuData.length - 1])}%</span>
    </div>
    <div class="h-10 w-full border border-white/5 relative bg-night-black/20">
      <svg class="absolute inset-0 w-full h-full">
        <path 
          d={getPath(cpuData, 192, 40)} 
          fill="none" 
          stroke="var(--color-night-pink)" 
          stroke-width="1.5" 
          class="transition-all duration-200"
        />
      </svg>
    </div>
  </div>

  <!-- RAM -->
  <div class="space-y-1">
    <div class="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/50">
      <span>MEM_USAGE</span>
      <span class="text-night-lime">{Math.round(ramData[ramData.length - 1])}%</span>
    </div>
    <div class="h-10 w-full border border-white/5 relative bg-night-black/20">
      <svg class="absolute inset-0 w-full h-full">
        <path 
          d={getPath(ramData, 192, 40)} 
          fill="none" 
          stroke="var(--color-night-lime)" 
          stroke-width="1.5" 
          class="transition-all duration-200"
        />
      </svg>
    </div>
  </div>

  <!-- Network -->
  <div class="space-y-1">
    <div class="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/50">
      <span>NET_TRAFFIC</span>
      <span class="text-white/80">{Math.round(netData[netData.length - 1])}KB/S</span>
    </div>
    <div class="h-10 w-full border border-white/5 relative bg-night-black/20">
      <svg class="absolute inset-0 w-full h-full">
        <path 
          d={getPath(netData, 192, 40)} 
          fill="none" 
          stroke="rgba(255,255,255,0.3)" 
          stroke-width="1" 
          stroke-dasharray="2 2"
          class="transition-all duration-200"
        />
      </svg>
    </div>
  </div>

  <!-- System Status -->
  <div class="pt-2 border-t border-white/10 flex flex-col gap-1">
    <div class="flex items-center gap-2">
      <div class="w-1.5 h-1.5 rounded-full bg-night-lime animate-pulse"></div>
      <span class="text-[8px] uppercase tracking-tighter text-white/40">Encryption_Active</span>
    </div>
    <div class="flex items-center gap-2">
      <div class="w-1.5 h-1.5 rounded-full bg-night-pink animate-pulse"></div>
      <span class="text-[8px] uppercase tracking-tighter text-white/40">Kernel_Secure_Link</span>
    </div>
  </div>
</div>
