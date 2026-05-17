<script lang="ts">
  import { onMount, tick } from 'svelte';

  interface Props {
    onExecuteCommand?: (cmd: string) => void;
    [key: string]: any;
  }

  let { onExecuteCommand }: Props = $props();

  let input = $state('');
  let history = $state<{ type: 'input' | 'output' | 'error', text: string }[]>([
    { type: 'output', text: 'NIGHT_OS TERMINAL [Version 1.0.42]' },
    { type: 'output', text: '(c) 2026 Night_Systems Corp. All rights reserved.' },
    { type: 'output', text: '' },
    { type: 'output', text: 'Type "help" to see available commands.' },
    { type: 'output', text: '' }
  ]);
  
  let terminalRef = $state<HTMLElement>();
  let inputRef = $state<HTMLInputElement>();

  const systemModules = {
    'system_info.sh': 'about',
    'modules.bin': 'projects',
    'secure_link.exe': 'contact',
    'settings.sys': 'settings',
    'about': 'about',
    'projects': 'projects',
    'contact': 'contact',
    'settings': 'settings'
  };

  const commands: Record<string, () => void> = {
    help: () => {
      addOutput('Available commands:');
      addOutput('  help      - Show this help message');
      addOutput('  ls        - List available system modules');
      addOutput('  open [mod]- Open a specific system module');
      addOutput('  clear     - Clear terminal history');
      addOutput('  whoami    - Display current user info');
      addOutput('  date      - Display current system date');
      addOutput('  echo [msg]- Print message to terminal');
      addOutput('');
      addOutput('Hint: You can type a module name directly to open it.');
    },
    ls: () => {
      addOutput('System_Info.sh');
      addOutput('Modules.bin');
      addOutput('Secure_Link.exe');
      addOutput('Settings.sys');
    },
    clear: () => {
      history = [];
    },
    whoami: () => {
      addOutput('Guest@NIGHT_OS');
    },
    date: () => {
      addOutput(new Date().toString());
    }
  };

  function addOutput(text: string, type: 'output' | 'error' = 'output') {
    history = [...history, { type, text }];
  }

  async function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const trimmedInput = input.trim();
      const lowerInput = trimmedInput.toLowerCase();
      const [cmd, ...args] = lowerInput.split(' ');

      history = [...history, { type: 'input', text: `> ${trimmedInput}` }];
      
      if (cmd) {
        if (commands[cmd]) {
          commands[cmd]();
        } else if (cmd === 'echo') {
          addOutput(args.join(' '));
        } else if (cmd === 'open' && args[0]) {
          const moduleId = systemModules[args[0]];
          if (moduleId) {
            addOutput(`Opening ${args[0]}...`);
            onExecuteCommand?.(moduleId);
          } else {
            addOutput(`Module not found: ${args[0]}`, 'error');
          }
        } else if (systemModules[cmd]) {
          addOutput(`Opening ${trimmedInput}...`);
          onExecuteCommand?.(systemModules[cmd]);
        } else {
          addOutput(`Command not found: ${cmd}`, 'error');
        }
      }

      input = '';
      await tick();
      scrollToBottom();
    }
  }

  function scrollToBottom() {
    if (terminalRef) {
      terminalRef.scrollTop = terminalRef.scrollHeight;
    }
  }

  onMount(() => {
    inputRef?.focus();
  });
</script>

<div 
  bind:this={terminalRef}
  class="flex flex-col h-full font-jetbrains text-sm overflow-y-auto custom-terminal-scrollbar"
  onclick={() => inputRef?.focus()}
  role="presentation"
>
  <div class="flex-grow space-y-1">
    {#each history as line}
      <div class="whitespace-pre-wrap break-all
        {line.type === 'input' ? 'text-white font-bold' : ''}
        {line.type === 'output' ? 'text-white/60' : ''}
        {line.type === 'error' ? 'text-night-pink' : ''}
      ">
        {line.text}
      </div>
    {/each}
  </div>

  <div class="flex items-center gap-2 mt-4 flex-shrink-0">
    <span class="text-night-lime font-bold">guest@night_os:~$</span>
    <input
      bind:this={inputRef}
      bind:value={input}
      onkeydown={handleKeydown}
      class="bg-transparent border-none outline-none text-white flex-grow p-0 m-0"
      spellcheck="false"
      autocomplete="off"
    />
  </div>
</div>

<style>
  .custom-terminal-scrollbar::-webkit-scrollbar {
    width: 2px;
  }
  .custom-terminal-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-terminal-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
  }
  
  input {
    caret-shape: block;
    caret-color: var(--color-night-lime);
  }
</style>
