<script lang="ts">
  export let name: string;
  export let role: string = '';
  export let status: string = '';
  export let snippet: string = '';
  export let isActive: boolean = false;
  export let isUnread: boolean = false;
  export let onClick: () => void = () => {};
</script>

<div 
  class="SidebarLabel cursor-pointer pl-2 pr-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 leading-none {isActive ? 'bg-blue-600' : ''}"
  on:click={onClick}
  role="button"
  tabindex="0"
  on:keydown={(e) => e.key === 'Enter' && onClick()}
>
  <div>
    <span class="Role text-black {isUnread ? "font-medium" : ""} text-xs">{role}</span>
  </div>
  {#if name || status}
    <div class="mb-1 flex gap-2">
      {#if name}
        <span class="Name text-black text-xs">{name}</span>
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