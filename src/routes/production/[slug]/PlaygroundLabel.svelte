<script lang="ts">
  export let name: string;
  export let role: string = '';
  export let status: string = '';
  export let snippet: string = '';
  export let isActive: boolean = false;
  export let onClick: () => void = () => {};
</script>

<div 
  class="PlaygroundLabel cursor-pointer p-3 rounded-lg transition-colors duration-200 hover:bg-gray-700 {isActive ? 'bg-blue-600' : ''}"
  on:click={onClick}
  role="button"
  tabindex="0"
  on:keydown={(e) => e.key === 'Enter' && onClick()}
>
  <div class="mb-1">
    <span class="Name text-white font-medium text-sm">{name}</span>
  </div>
  {#if role || status}
    <div class="mb-1 flex gap-2">
      {#if role}
        <span class="Role text-gray-300 text-xs">{role}</span>
      {/if}
      {#if status}
        <span class="Status text-green-400 text-xs">● {status}</span>
      {/if}
    </div>
  {/if}
  {#if snippet}
    <div>
      <span class="Snippet text-gray-400 text-xs truncate block">{snippet}</span>
    </div>
  {/if}
</div>