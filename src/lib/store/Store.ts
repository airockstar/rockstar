
import { createClient } from '@supabase/supabase-js';
import type { User, Status } from "$lib/types";
import { get, writable } from "svelte/store";
import { supabase } from '$lib/supabaseClient';
import { log } from '@utils/logger';

export function getChannels(user) {
console.log("ENTER getChannels");
	log.enter(import.meta.url, "getChannels", user);
	let channels = [];
	(async () => {
		const { data, error } = await supabase.from('Channels').select('*');
        	if (error) {
			console.error('Error fetching channels:', error.message);
		} else {
			channels = data;
		}
	})();
	log.exit(import.meta.url, "getChannels", "channels: " + JSON.stringify(channels));
	return channels;
};

export function getVistedChannelTimestamps(user) {
	let visits = {};
	(async () => {
		const { data, error } = await supabase.from('Visited').eq({ user_id: user.id });
        	if (error) {
			console.error('Error fetching visits:', error.message);
		} else {
			visits = data;
		}
	})();
	return visits;
};


