

<script lang="ts">
	export let channels;
	export let visiteds;
	export let user;
</script>

<div class="RSidebar">
	<div class="channels">
		{#each channels || [] as channel}
			<RChannel
				name={channel?.name}
				role={channel?.role}
				snippet={channel?.last_message.substring(0, 40)}
				unread={visiteds[channel?.name] ? visiteds[channel?.name].timestamp < channel.updated_on : false} />
		{/each}
	</div>
</div>

