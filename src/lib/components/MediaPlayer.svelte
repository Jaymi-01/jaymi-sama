<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    MusicNotes,
    SpeakerHigh,
    SpeakerLow,
    SpeakerSlash,
    Shuffle,
    Repeat,
    RepeatOnce,
  } from "phosphor-svelte";

  const playlist = [
    { title: "Africa", artist: "Toto", src: "/music/Africa.mp3" },
    {
      title: "All Too Well (10min)",
      artist: "Taylor Swift",
      src: "/music/All To Well (10 Minutes Version).mp3",
    },
    {
      title: "Back To December",
      artist: "Taylor Swift",
      src: "/music/Back To December.mp3",
    },
    {
      title: "Blank Space",
      artist: "Taylor Swift",
      src: "/music/Blank Space.mp3",
    },
    {
      title: "Blue Bird",
      artist: "Naruto Shippuden",
      src: "/music/Blue Bird.mp3",
    },
    {
      title: "Can't Stop",
      artist: "Red Hot Chili Peppers",
      src: "/music/Can't Stop.mp3",
    },
    { title: "Cardigan", artist: "Taylor Swift", src: "/music/Cardigan.mp3" },
    {
      title: "From The Start",
      artist: "Laufey",
      src: "/music/From The Start.mp3",
    },
    { title: "Gurenge", artist: "LiSA", src: "/music/Gurenge.mp3" },
    {
      title: "Just A Man",
      artist: "Epic: The Musical",
      src: "/music/Just A Man.mp3",
    },
    { title: "Kill Bill", artist: "SZA", src: "/music/Kill Bill.mp3" },
    { title: "Legendary", artist: "Welshly Arms", src: "/music/Legendary.mp3" },
    {
      title: "Love In Paradise",
      artist: "Epic: The Musical",
      src: "/music/Love In Paradise.mp3",
    },
    {
      title: "My Boy...",
      artist: "Taylor Swift",
      src: "/music/My Boy Only Breaks His Favorite Toy.mp3",
    },
    {
      title: "Not Sorry...",
      artist: "Epic: The Musical",
      src: "/music/Not Sorry For Loving You.mp3",
    },
    {
      title: "Renai Circulation",
      artist: "Bakemonogatari",
      src: "/music/Renai Circulation.mp3",
    },
    {
      title: "Shinzou wo Sasageyo",
      artist: "Linked Horizon",
      src: "/music/Shinzou wo Sasageyo.mp3",
    },
    { title: "Silhouette", artist: "KANA-BOON", src: "/music/Silhouette.mp3" },
    { title: "Specialz", artist: "King Gnu", src: "/music/Specialz.mp3" },
    { title: "Sunflower", artist: "Post Malone", src: "/music/Sunflower.mp3" },
    {
      title: "The Challenge",
      artist: "Epic: The Musical",
      src: "/music/The Challenge.mp3",
    },
    {
      title: "The Fate Of Ophelia",
      artist: "Taylor Swift",
      src: "/music/The Fate Of Ophelia.mp3",
    },
    {
      title: "We Are Young",
      artist: "fun. Ft. Janelle Monáe",
      src: "/music/We Are Young.mp3",
    },
    { title: "We Are!", artist: "Hiroshi Kitadani", src: "/music/We Are!.mp3" },
    {
      title: "Wildflower",
      artist: "Billie Eilish",
      src: "/music/Wildflower.mp3",
    },
    { title: "Wind", artist: "Akeboshi", src: "/music/Wind.mp3" },
    {
      title: "Would You Fall...",
      artist: "Epic: The Musical",
      src: "/music/Would You Fall In Love With Me Again.mp3",
    },
    {
      title: "You're Losing Me",
      artist: "Taylor Swift",
      src: "/music/You're Losing Me.mp3",
    },
  ];

  let currentIndex = $state(0);
  let isPlaying = $state(false);
  let currentTime = $state(0);
  let duration = $state(0);
  let volume = $state(0.5);
  let isMuted = $state(false);
  let isShuffled = $state(false);
  let repeatMode = $state<"off" | "all" | "one">("off");

  let audio: HTMLAudioElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let audioContext: AudioContext;
  let analyser: AnalyserNode;
  let dataArray: any;
  let animationFrame: number;

  function initAudio() {
    if (audioContext) return;

    audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 128;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    draw();
  }

  function draw() {
    animationFrame = requestAnimationFrame(draw);
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, width, height);

    const barWidth = (width / dataArray.length) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      barHeight = (dataArray[i] / 255) * height;

      // Cyberpunk gradient-like color
      const r = 255;
      const g = 0;
      const b = 128; // Pinkish

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dataArray[i] / 255 + 0.2})`;
      ctx.fillRect(x, height - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  }

  function togglePlay() {
    if (!audioContext) initAudio();
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    isPlaying = !isPlaying;
  }

  function nextTrack(forcePlay = false) {
    if (isShuffled) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } while (nextIndex === currentIndex && playlist.length > 1);
      currentIndex = nextIndex;
    } else {
      currentIndex = (currentIndex + 1) % playlist.length;
    }
    currentTime = 0;
    
    const shouldPlay = isPlaying || forcePlay;
    if (shouldPlay) {
      isPlaying = true;
      setTimeout(() => audio.play().catch(console.error), 50);
    }
  }

  function prevTrack() {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    currentTime = 0;
    if (isPlaying) {
      setTimeout(() => audio.play().catch(console.error), 50);
    }
  }

  function handleTrackSelect(index: number) {
    currentIndex = index;
    currentTime = 0;
    if (!audioContext) initAudio();
    isPlaying = true;
    setTimeout(() => audio.play().catch(console.error), 50);
  }

  function handleTrackEnd() {
    if (repeatMode === "one") {
      audio.currentTime = 0;
      audio.play().catch(console.error);
    } else if (repeatMode === "all" || isShuffled) {
      nextTrack(true);
    } else if (currentIndex < playlist.length - 1) {
      nextTrack(true);
    } else {
      isPlaying = false;
    }
  }

  function toggleShuffle() {
    isShuffled = !isShuffled;
  }

  function toggleRepeat() {
    const modes: ("off" | "all" | "one")[] = ["off", "all", "one"];
    const currentIdx = modes.indexOf(repeatMode);
    repeatMode = modes[(currentIdx + 1) % modes.length];
  }

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  onMount(() => {
    // Load persisted state
    const savedState = localStorage.getItem("night_os_media_state");
    if (savedState) {
      const state = JSON.parse(savedState);
      if (state.index < playlist.length) {
        currentIndex = state.index;
        isShuffled = state.shuffled || false;
        repeatMode = state.repeat || "off";
        // Small delay to ensure audio element is ready for seeking
        setTimeout(() => {
          if (audio) audio.currentTime = state.time;
        }, 100);
      }
    }

    audio.volume = volume;
  });

  // Save state whenever index or time changes significantly
  $effect(() => {
    const state = {
      index: currentIndex,
      time: currentTime,
      shuffled: isShuffled,
      repeat: repeatMode,
    };
    localStorage.setItem("night_os_media_state", JSON.stringify(state));
  });

  onDestroy(() => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    if (audioContext) audioContext.close();
  });

  $effect(() => {
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  });
</script>

<div class="flex flex-col h-full bg-night-black/40 font-jetbrains select-none">
  <!-- Compact Visualizer Header -->
  <div class="h-32 relative border-b border-white/5 overflow-hidden shrink-0">
    <canvas
      bind:this={canvas}
      width="400"
      height="128"
      class="w-full h-full opacity-30"
    ></canvas>
    <div
      class="absolute inset-0 flex flex-col items-center justify-end pb-4 px-6 bg-gradient-to-t from-night-black/90 via-night-black/40 to-transparent z-10"
    >
      <h3
        class="text-white font-bold tracking-[0.2em] uppercase text-xs truncate w-full text-center drop-shadow-lg"
      >
        {playlist[currentIndex].title}
      </h3>
      <p
        class="text-night-pink text-[9px] uppercase tracking-[0.3em] opacity-80 mt-0.5 text-center"
      >
        {playlist[currentIndex].artist}
      </p>
    </div>
  </div>

  <!-- Consolidated Controls -->
  <div class="p-3 space-y-3 shrink-0 bg-white/[0.02]">
    <!-- Progress Bar -->
    <div class="space-y-1.5 px-1">
      <div
        class="relative w-full h-1 bg-white/5 rounded-full overflow-hidden group/progress"
      >
        <div
          class="absolute top-0 left-0 h-full bg-night-pink shadow-[0_0_8px_rgba(255,0,128,0.5)] transition-all duration-100 ease-out"
          style="width: {(currentTime / duration) * 100 || 0}%"
        ></div>
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          bind:value={currentTime}
          oninput={() => (audio.currentTime = currentTime)}
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
      </div>
      <div
        class="flex justify-between text-[8px] font-bold text-white/20 uppercase tracking-[0.1em]"
      >
        <span class={isPlaying ? "text-night-pink/40" : ""}
          >{formatTime(currentTime)}</span
        >
        <span>{formatTime(duration)}</span>
      </div>
    </div>

    <!-- Responsive Control Row -->
    <div class="flex items-center justify-between gap-2 sm:gap-4 px-2 py-1">
      <!-- Empty spacer to balance the volume on the right -->
      <div class="hidden sm:block w-20"></div>

      <!-- Consolidated Centered Button Group -->
      <div class="flex items-center justify-center gap-2 sm:gap-4 flex-grow">
        <button
          onclick={toggleShuffle}
          class="transition-colors {isShuffled
            ? 'text-night-pink'
            : 'text-white/20 hover:text-white/40'}"
          title="Shuffle"
        >
          <Shuffle size={14} weight={isShuffled ? "bold" : "regular"} />
        </button>

        <button
          onclick={prevTrack}
          class="text-white/40 hover:text-white transition-colors"
        >
          <SkipBack size={18} weight="fill" />
        </button>

        <button
          onclick={togglePlay}
          class="w-9 h-9 rounded-full bg-night-pink flex items-center justify-center text-white shadow-[0_0_10px_rgba(255,0,128,0.3)] hover:scale-105 active:scale-95 transition-all flex-shrink-0"
        >
          {#if isPlaying}
            <Pause size={18} weight="fill" />
          {:else}
            <Play size={18} weight="fill" class="ml-0.5" />
          {/if}
        </button>

        <button onclick={() => nextTrack()} class="text-white/40 hover:text-white transition-colors">
          <SkipForward size={18} weight="fill" />
        </button>

        <button
          onclick={toggleRepeat}
          class="transition-colors {repeatMode !== 'off'
            ? 'text-night-pink'
            : 'text-white/20 hover:text-white/40'}"
          title="Repeat: {repeatMode}"
        >
          {#if repeatMode === "one"}
            <RepeatOnce size={14} weight="bold" />
          {:else}
            <Repeat
              size={14}
              weight={repeatMode === "all" ? "bold" : "regular"}
            />
          {/if}
        </button>
      </div>

      <!-- Compact Volume (Restored to the right) -->
      <div class="flex items-center gap-1.5 w-16 sm:w-20 flex-shrink-0">
        <button
          onclick={() => (isMuted = !isMuted)}
          class="text-white/20 hover:text-white/40 transition-colors"
        >
          {#if isMuted || volume === 0}
            <SpeakerSlash size={13} />
          {:else}
            <SpeakerHigh size={13} />
          {/if}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          bind:value={volume}
          class="w-full h-1 bg-white/5 accent-white/20 cursor-pointer appearance-none rounded-full"
        />
      </div>
    </div>
  </div>

  <!-- Playlist (Expanded Area) -->
  <div
    class="flex-grow overflow-y-auto custom-scrollbar border-t border-white/5 bg-night-black/10"
  >
    {#each playlist as track, i}
      <button
        onclick={() => handleTrackSelect(i)}
        class="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-white/[0.03] transition-colors group {currentIndex ===
        i
          ? 'bg-white/[0.03]'
          : ''}"
      >
        <div
          class="w-8 h-8 rounded-sm bg-white/5 border border-white/5 flex items-center justify-center text-white/20 group-hover:text-night-pink group-hover:border-night-pink/20 transition-all relative overflow-hidden flex-shrink-0"
        >
          {#if currentIndex === i}
            {#if isPlaying}
              <Pause
                size={14}
                weight="fill"
                class="text-night-pink animate-pulse"
              />
              <div
                class="absolute bottom-0.5 flex gap-0.5 items-end h-1.5 opacity-40"
              >
                <div
                  class="w-0.5 bg-night-pink animate-[music-bar_0.8s_infinite]"
                ></div>
                <div
                  class="w-0.5 bg-night-pink animate-[music-bar_1.2s_infinite]"
                ></div>
                <div
                  class="w-0.5 bg-night-pink animate-[music-bar_1s_infinite]"
                ></div>
              </div>
            {:else}
              <Play size={14} weight="fill" class="text-night-pink" />
            {/if}
          {:else}
            <MusicNotes size={14} />
          {/if}
        </div>
        <div
          class="flex flex-col items-start justify-center overflow-hidden flex-grow text-left"
        >
          <span
            class="text-[11px] font-bold text-white group-hover:text-night-pink transition-colors truncate w-full {currentIndex ===
            i
              ? 'text-night-pink'
              : ''}"
          >
            {track.title}
          </span>
          <span
            class="text-[8px] text-white/30 uppercase tracking-[0.1em] truncate w-full group-hover:text-white/50 transition-colors"
          >
            {track.artist}
          </span>
        </div>
      </button>
    {/each}
  </div>

  <audio
    bind:this={audio}
    src={playlist[currentIndex].src}
    onplay={() => (isPlaying = true)}
    onpause={() => (isPlaying = false)}
    ontimeupdate={() => (currentTime = audio.currentTime)}
    onloadedmetadata={() => (duration = audio.duration)}
    onended={handleTrackEnd}
  ></audio>
</div>

<style>
  @keyframes music-bar {
    0%,
    100% {
      height: 4px;
    }
    50% {
      height: 12px;
    }
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 2px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
  }

  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: currentColor;
    cursor: pointer;
  }
</style>
