
import { createClient } from '@supabase/supabase-js';
import type { User, Status } from "$lib/types";
import { get, writable } from "svelte/store";
import { supabase } from '$lib/supabaseClient';
import { getLogger } from "@utils/logger"
const log = getLogger(import.meta.url);

export function getChannels(user) {
	log.enter("getChannels");
	let channels = [];
	(async () => {
		const { data, error } = await supabase.from('channel').select('*');
        	if (error) {
			console.error('Error fetching channels:', error.message);
		} else {
			channels = data;
		}
	})();
	log.exit("getChannels", "channels: " + JSON.stringify(channels));
	return channels;
};

export function getVistedChannelTimestamps(user) {
	let visits = {};
	(async () => {
		const { data, error } = await supabase.from('visited').eq({ user_id: user.id });
        	if (error) {
			console.error('Error fetching visits:', error.message);
		} else {
			visits = data;
		}
	})();
	return visits;
};


export function getProfile(user) {
	let profile = null;
	(async () => {
		const { data, error } = await supabase.from('profile').eq({ user_id: user.id });
        	if (error) {
			console.error('Error fetching profile:', error.message);
		} else {
			profile = data;
		}
	})();
	return profile;
};


