<script lang="ts">
  import { writable, type Writable } from 'svelte/store';
  import SidebarLabel from './SidebarLabel.svelte';
  import SidebarAgentLabel from './SidebarAgentLabel.svelte';

  export let channels: object[];
  export let agents: object[];
  export let artifacts: object[];
  export let activeSelection: Writable<{
    type: 'string';
  }>;

  let channelsExpanded = true;
  let agentsExpanded = true;
  let artifactsExpanded = true;

  $: currentSelection = $activeSelection;

  function selectItem(type: 'channel' | 'agent' | 'artifact', item: string) {
    activeSelection.set({ type, item });
  }

  function toggleSection(section: 'channels' | 'agents' | 'artifacts') {
    if (section === 'channels') channelsExpanded = !channelsExpanded;
    else if (section === 'agents') agentsExpanded = !agentsExpanded;
    else if (section === 'artifacts') artifactsExpanded = !artifactsExpanded;
  }
</script>

<div class="Sidebar flex flex-col h-full overflow-y-auto">
  <!-- Channels Section -->
  <div class="p-4">
    <button
      class="flex items-center justify-between w-full text-left text-gray-600 hover:text-black mb-2"
      on:click={() => toggleSection('channels')}
    >
      <span class="font-medium text-sm uppercase tracking-wide">Channels</span>
      <span class="text-xs">{channelsExpanded ? '▼' : '▶'}</span>
    </button>
    
    {#if channelsExpanded}
      <div class="space-y-1">
        {#each channels as channel}
          <SidebarLabel
            name={channel.name}
            role={channel.role}
            status={channel.status}
            snippet={channel.snippet}
            isActive={currentSelection === channel.guid}
            onClick={() => selectItem('channel', channel.guid)}
          />
        {/each}
      </div>
    {/if}
  </div>

  <!-- Agents Section -->
  <div class="p-4">
    <button
      class="flex items-center justify-between w-full text-left text-gray-600 hover:text-black mb-2"
      on:click={() => toggleSection('agents')}
    >
      <span class="font-medium text-sm uppercase tracking-wide">Agents</span>
      <span class="text-xs">{agentsExpanded ? '▼' : '▶'}</span>
    </button>
    
    {#if agentsExpanded}
      <div class="space-y-1">
        {#each agents as agent}
          <SidebarAgentLabel agent={agent}
            isActive={currentSelection === agent.guid}
            onClick={() => selectItem('agent', agent.guid)}
          />
        {/each}
      </div>
    {/if}
  </div>

  <!-- Artifacts Section -->
  <div class="p-4">
    <button
      class="flex items-center justify-between w-full text-left text-gray-600 hover:text-black mb-2"
      on:click={() => toggleSection('artifacts')}
    >
      <span class="font-medium text-sm uppercase tracking-wide">Artifacts</span>
      <span class="text-xs">{artifactsExpanded ? '▼' : '▶'}</span>
    </button>
    
    {#if artifactsExpanded}
      <div class="space-y-1">
        {#each artifacts as artifact}
          <SidebarLabel
            name={artifact.name}
            role={artifact.role}
            status={artifact.status}
            snippet={artifact.snippet}
            isActive={currentSelection === artifact.guid}
            onClick={() => selectItem('artifact', artifact)}
          />
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
	.Sidebar {
		background-color: #f8f8ff;
	}
</style>
