
<script lang="ts">
	import sanitizeHtml from "sanitize-html";

	export let name: String;
	export let role: string;
	export let snippet: string;
	export let read: Boolean;
</script>

<div class="RChannel">
	<div class="Header">
		<h6 class={read ? "" : "Bold"}>{role}</h6>
		<h5>{name}</h5>
	</div>
	<p class="Snippet">{@html sanitizeHtml(snippet)}</p>
</div>

<style lang="scss">
	.Snippet {
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
