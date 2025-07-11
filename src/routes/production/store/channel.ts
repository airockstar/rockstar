import { page } from "$app/state"
import { fetchChannelData } from "@api/channel-api";
import { derived, get, writable } from "svelte/store";
import type { Readable } from "svelte/store";
import type { PrivateChannel, Channel } from "../types";

type Status = "loading" | "available" | "error";
interface AsyncStore<T> {
	state: Status;
	data?: T;
}

const initalAsyncState: AsyncStore<[]> = { state: "loading", data: [] };

export const privateChannels = writable<AsyncStore<PrivateChannel[]>>(initalAsyncState, (set) => {
/*
	fetchChannelData("user", $page.data.session.user.id).then((value: PrivateChannel[]) => {
		set({ state: "available", data: value });
	});
*/
});

export const publicChannels = writable<AsyncStore<Channel[]>>(initalAsyncState, (set) => {
/*
	fetchChannelData("group", $page.data.session.user.id).then((value: Channel[]) => {
		set({ state: "available", data: value });
	});
*/
});

export const publicChannel: Readable<Channel[]> = derived(publicChannels, ($channel) => {
//	return [].concat(...$channel.data.map((channel) => channel));
});
