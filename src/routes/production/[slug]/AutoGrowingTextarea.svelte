<script lang="ts">
  export let value: string = '';
  export let placeholder: string = 'Type a message...';
  export let onSend: () => void = () => {};

  let textarea: HTMLTextAreaElement;
  let minHeight = 40;
  let maxHeight = 200;

  function adjustHeight() {
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  }

  function handleInput() {
    adjustHeight();
  }

  $: if (value !== undefined) {
    setTimeout(adjustHeight, 0);
  }
</script>

<div class="flex items-end gap-2">
  <div class="flex-1 relative">
    <textarea
      bind:this={textarea}
      bind:value={value}
      {placeholder}
      class="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      style="min-height: {minHeight}px; max-height: {maxHeight}px;"
      on:input={handleInput}
      on:keydown={handleKeydown}
      rows="1"
    ></textarea>
  </div>
  <button
    on:click={onSend}
    disabled={!value.trim()}
    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
  >
    Send
  </button>
</div>