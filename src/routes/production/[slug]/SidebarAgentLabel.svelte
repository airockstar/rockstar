<script lang="ts">
  export let isActive: boolean = false;
  export let isUnread: boolean = false;
  export let agent: object;
  export let onClick: () => void = () => {};
</script>

<div 
  class="SidebarLabel cursor-pointer pl-2 pr-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 {isActive ? 'bg-blue-600' : ''}"
  on:click={onClick}
  role="button"
  tabindex="0"
  on:keydown={(e) => e.key === 'Enter' && onClick()}
>
  <div>
    <span class="Role text-black {isUnread ? "font-medium text-sm" : "text-xs"}">{agent.role}</span>
  </div>
  {#if agent.name || agent.status}
    <div class="mb-1 flex gap-2">
      {#if agent.name}
        <span class="Name text-black text-xs">{agent.name}</span>
      {/if}
      {#if agent.status}
        <span class="Status text-green-400 text-xs">● {agent.status}</span>
      {/if}
    </div>
  {/if}
  {#if agent.snippet}
    <div>
      <span class="Snippet text-gray-400 text-xs truncate block">{agent.snippet}</span>
    </div>
  {/if}
</div>