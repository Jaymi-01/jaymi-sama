<script lang="ts">
  import { onMount } from 'svelte';
  import { Power, BatteryCharging, BatteryHigh, BatteryMedium, BatteryLow, WifiHigh, WifiSlash, SpeakerHigh, SpeakerSlash } from 'phosphor-svelte';

  interface Props {
    openWindows: { id: string; title: string }[];
    activeWindowId: string | null;
    onWindowClick: (id: string) => void;
    onPowerClick: () => void;
  }

  let { openWindows, activeWindowId, onWindowClick, onPowerClick }: Props = $props();

  let time = $state('');
  let dateString = $state('');
  let batteryLevel = $state<number | null>(null);
  let isCharging = $state(false);
  let isOnline = $state(true);
  let isMuted = $state(false);
  let connectionName = $state('Internet Access');

  onMount(() => {
    const updateDateTime = () => {
      const now = new Date();
      time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      dateString = now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    // Battery API Logic
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBattery = () => {
          batteryLevel = Math.round(battery.level * 100);
          isCharging = battery.charging;
        };
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
      });
    }

    // Network Logic
    isOnline = navigator.onLine;
    const updateOnlineStatus = () => {
      isOnline = navigator.onLine;
    };
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Try to get more connection info
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      const updateConn = () => {
        connectionName = conn.type === 'wifi' ? 'Wi-Fi Connection' : 'Internet Access';
      };
      updateConn();
      conn.addEventListener('change', updateConn);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  });

  const BatteryIcon = $derived(() => {
    if (isCharging) return BatteryCharging;
    if (batteryLevel === null) return BatteryHigh;
    if (batteryLevel > 70) return BatteryHigh;
    if (batteryLevel > 20) return BatteryMedium;
    return BatteryLow;
  });
</script>

<div class="fixed bottom-0 left-0 w-full h-14 bg-black/80 backdrop-blur-md border-t border-white/10 flex items-center justify-between px-4 z-[10000]">
  <div class="flex items-center gap-4 h-full">
    <button 
      onclick={onPowerClick}
      class="h-10 w-10 flex items-center justify-center text-night-pink transition-colors"
      title="Shut Down"
    >
      <Power size={24} weight="bold" />
    </button>
    
    <div class="flex gap-1 h-full py-1.5 overflow-x-auto no-scrollbar max-w-[40vw] sm:max-w-none">
      {#each openWindows as window}
        <button
          onclick={() => onWindowClick(window.id)}
          class="px-2 md:px-4 h-full flex items-center gap-2 border-b-2 transition-all flex-shrink-0 {activeWindowId === window.id ? 'border-night-pink bg-white/10' : 'border-transparent bg-white/5 hover:bg-white/10'}"
        >
          <span class="text-[9px] md:text-xs font-bold uppercase tracking-widest text-white/80 font-jetbrains whitespace-nowrap">{window.title}</span>
        </button>
      {/each}
    </div>
  </div>

  <div class="flex items-center gap-2 md:gap-6 text-white/60 font-jetbrains text-[10px] font-bold tracking-widest h-full">
    <!-- Wifi Icon -->
    <div class="group relative hidden sm:flex items-center">
      {#if isOnline}
        <WifiHigh size={18} weight="bold" class="text-night-lime" />
        <div class="absolute bottom-12 right-0 bg-night-black border border-white/10 px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none text-xs">
          {connectionName}
        </div>
      {:else}
        <WifiSlash size={18} weight="bold" class="text-night-pink animate-pulse" />
        <div class="absolute bottom-12 right-0 bg-night-black border border-white/10 px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none text-xs">
          Disconnected
        </div>
      {/if}
    </div>

    <!-- Sound Icon -->
    <button 
      class="hidden sm:flex items-center transition-colors {isMuted ? 'text-night-pink' : 'text-white/60 hover:text-night-lime'}" 
      onclick={() => (isMuted = !isMuted)}
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {#if isMuted}
        <SpeakerSlash size={18} weight="bold" />
      {:else}
        <SpeakerHigh size={18} weight="bold" />
      {/if}
    </button>

    <!-- Battery -->
    {#if batteryLevel !== null}
      {@const Icon = BatteryIcon()}
      <div class="hidden sm:flex items-center gap-1.5 {batteryLevel < 20 && !isCharging ? 'text-night-pink animate-pulse' : 'text-night-lime'}">
        <Icon size={16} weight="bold" />
        <span>{batteryLevel}%</span>
      </div>
    {/if}
    
    <div class="px-2 md:px-3 flex flex-col items-center justify-center min-w-[80px] md:min-w-[100px] h-10 hover:bg-white/5 transition-colors cursor-default">
      <span class="text-white leading-tight text-[10px] md:text-xs">{time}</span>
      <span class="opacity-40 text-[8px] md:text-[9px] leading-tight mt-0.5">{dateString}</span>
    </div>
  </div>
</div>
