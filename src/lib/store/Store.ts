
import { createClient } from '@supabase/supabase-js';
import type { User, Status } from "$lib/types";
import { get, writable } from "svelte/store";
import { supabase } from '$lib/supabaseClient';

export function getChannels(user) {
	let channels = [];
	(async () => {
		const { data, error } = await supabase.from('Channels').select('*');
        	if (error) {
			console.error('Error fetching channels:', error.message);
		} else {
			channels = data;
		}
	})();
	return channels;
};

export function getVistedChannelTimestamps(user) {
	let visits = {};
	(async () => {
		const { data, error } = await supabase.from('Visited').select({ user_id: user.id });
        	if (error) {
			console.error('Error fetching visits:', error.message);
		} else {
			visits = data;
		}
	})();
	return visits;
};


