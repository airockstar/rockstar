<script lang="ts">
  import { writable } from 'svelte/store';
  import AutoGrowingTextarea from './AutoGrowingTextarea.svelte';

  export let activeSelection: Writable<{
    type: 'channel' | 'agent' | 'artifact';
    item: string;
  }>;

  interface Message {
    id: string;
    sender: string;
    content: string;
    timestamp: Date;
    type: 'user' | 'system' | 'agent';
  }

  let messages: Message[] = [
    {
      id: '1',
      sender: 'System',
      content: 'Welcome to the workspace! Select a channel, agent, or artifact to get started.',
      timestamp: new Date(),
      type: 'system'
    }
  ];

  let messageInput = '';
  let messagesContainer: HTMLElement;

  $: currentSelection = $activeSelection;
  $: if (currentSelection) {
    loadConversationHistory();
  }

  function loadConversationHistory() {
    messages = [
      {
        id: '1',
        sender: 'System',
        content: `You are now viewing ${currentSelection.item} (${currentSelection.type})`,
        timestamp: new Date(),
        type: 'system'
      },
      {
        id: '2',
        sender: currentSelection.item,
        content: `Hello! I'm ${currentSelection.item}. How can I help you today?`,
        timestamp: new Date(),
        type: currentSelection.type === 'agent' ? 'agent' : 'system'
      }
    ];
    scrollToBottom();
  }

  function sendMessage() {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: messageInput,
      timestamp: new Date(),
      type: 'user'
    };

    messages = [...messages, newMessage];
    messageInput = '';
    scrollToBottom();

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: currentSelection.item,
        content: `Thanks for your message! I'm ${currentSelection.item} and I received: "${newMessage.content}"`,
        timestamp: new Date(),
        type: currentSelection.type === 'agent' ? 'agent' : 'system'
      };
      messages = [...messages, response];
      scrollToBottom();
    }, 1000);
  }

  function scrollToBottom() {
    setTimeout(() => {
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 100);
  }

  function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
</script>

<div class="flex flex-col h-full">
  <!-- Messages Container -->
  <div 
    bind:this={messagesContainer}
    class="flex-1 overflow-y-auto p-4 space-y-4"
  >
    {#each messages as message (message.id)}
      <div class="flex flex-col">
        <div class="flex items-baseline gap-2 mb-1">
          <span class="font-medium text-sm text-gray-900">
            {message.sender}
          </span>
          <span class="text-xs text-gray-500">
            {formatTime(message.timestamp)}
          </span>
        </div>
        <div class="text-sm text-gray-800 leading-relaxed">
          {message.content}
        </div>
      </div>
    {/each}
  </div>

  <!-- Message Input -->
  <div class="bg-white border-t border-gray-200 p-4">
    <AutoGrowingTextarea
      bind:value={messageInput}
      placeholder="Type your message here..."
      onSend={sendMessage}
    />
  </div>
</div>


<!--

<style lang="scss">

.box {
  display: flex;
  flex-flow: column;
  height: 90vh;
}

.box .row {
  border: 1px dotted grey;
}

.box .row.header {
  flex: 0 1 auto;
  /* The above is shorthand for:
  flex-grow: 0,
  flex-shrink: 1,
  flex-basis: auto
  */
}

.box .row.content {
  flex: 1 1 auto;
}

.box .row.footer {
  flex: 0 1 3rem;
}
</style>

-->
