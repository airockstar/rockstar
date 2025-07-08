
<script lang="ts">
	export let message;
</script>

<div class="RChat">
	<div class="Chat">
		{#each message || [] as message}
			<RMessage
				sender={message?.sender}
				content={message?.content}
				date={message.created_on}
			 />
		{/each}
	</div>
</div>

