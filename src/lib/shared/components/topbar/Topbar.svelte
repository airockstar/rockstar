<script lang="ts">
	import { userStore, statusStore } from "@store/userStore";
	import Icon from "@iconify/svelte";
	import { log } from "@utils/logger";
	import ProfilePopup from "./ProfilePopup.svelte";
	import Search from "./Search.svelte";
	import avatar from '$lib/images/mock_avatar.jpg';


	let statusEmoji: string;

	let profilePopupOpen = false;
</script>

<div class="topbar">
	<div class="search">
		<Icon icon="bx:bx-time" width={24} height={24} color="#AFB0B" />
		<Search value={""} color="#333333" />
	</div>
	<Icon icon="fa-regular:question-circle" width={23} height={23} color="#AFB0B1" />
	<div class="avatar" on:click={() => (profilePopupOpen = true)}>
		{#if globalThis.$statusStore}
			<span class="emoji"> {globalThis.$statusStore?.emoji} </span>
		{/if}
		<img alt="Profile Avatar" src="{avatar}" />
		<div class:online={true} class="status-icon" />
		<ProfilePopup bind:profilePopupOpen />
	</div>
</div>

<style lang="scss">
	.topbar {
		grid-column: 1/-1;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: black;
		gap: 1.5em;
		width: 100%;
		padding: 5px 10px;
		border-bottom: 1px solid var(--color-tran);

		.emoji {
			font-size: 18px;
			margin-right: 10px;
		}

		.avatar {
			position: relative;
			display: flex;
			align-items: center;
		}

		img {
			object-fit: cover;
			width: 30px;
			border-radius: 4px;
			height: 30px;
		}

		.search {
			display: flex;
			align-items: center;
			gap: inherit;
			justify-content: center;
			width: 100%;
		}
	}

	.status-icon {
		position: absolute;
		width: 10px;
		height: 10px;
		bottom: 0;
		right: 0;
		border-radius: 50%;
		background-color: rgba(224, 224, 224, 0.541);

		&.online {
			background-color: #00ff00;
		}
	}
</style>
