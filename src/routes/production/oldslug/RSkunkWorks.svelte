<script lang="ts">
	import Sidebar from "../components/sidebar/Sidebar.svelte";
	import RSidebar from "./RSidebar.svelte";
	import RChat from "./RChat.svelte";
	import { socket } from "@utils/socket";
	import { onDestroy, onMount } from "svelte";
	import type { User } from "$lib/types";
	import { onlineUsers } from "../store/users";
	import { log } from "@utils/logger";
	import Topbar from "@components/topbar/Topbar.svelte";
	export let channels;
	export let visiteds;
	export let user;

	socket.on("user:active", (users: User[]) => {
		$onlineUsers = users;
	});

	// Maintain online users
	socket.on("user:connected", (user: User) => {
		onlineUsers.update((users) => {
			users.push(user);
			return users;
		});
	});

	socket.on("user:disconnected", (user: User) => {
		onlineUsers.update((users) => {
			return (users = users.filter((onlineUsers) => onlineUsers.username != user.username));
		});
	});

	socket.on("connect", async () => {
		log.info("Established websocket connection");
	});

	onMount(() => {
		if (!socket.connected) socket.connect();
	});

	onDestroy(() => {
		socket.removeAllListeners();
	});
</script>

<div class="wrapper">
    <Topbar />
    <div class="wrapper">
	<RSidebar user={user} channels={channels} visiteds={visiteds} />
	<RChat />
    </div>
</div>

<style lang="scss">
	.wrapper {
		height: 100%;
		background-color: var(--color-white-s1);
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: auto 1fr;
	}
</style>

