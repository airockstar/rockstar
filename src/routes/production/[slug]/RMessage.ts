
<script lang="ts">
	import sanitizeHtml from "sanitize-html";

	export let sender: { name };
	export let content: string;
	export let timestamp: string;
</script>

<div class="RMessage">
	<div class="Header">
		<h6>{sender.name} {timestamp}</h6>
	</div>
	<p class="Message">{@html sanitizeHtml(message)}</p>
</div>

<style lang="scss">
	.Message {
		display: flex;
		flex-direction: column;
		gap: 2px;

		h6,
		p {
			font-size: 15px;
		}
	}

	.Header {
		display: flex;
		gap: 10px;
		align-items: center;
		margin-top: 1em;

		span {
			font-size: 12px;
			color: #87898d;
		}
	}
</style>
