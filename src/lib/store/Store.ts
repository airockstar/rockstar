
import { createClient } from '@supabase/supabase-js';
import type { User, Status } from "$lib/types";
import { get, writable } from "svelte/store";
import { supabase } from '$lib/supabaseClient';
import { getLogger } from "@utils/logger"
const log = getLogger(import.meta.url);

export async function getChannels(user) {
	log.enter("getChannels");
	let channels = [];
		const { data, error } = await supabase.from('channel').select('*');
        	if (error) {
			log.error('Error fetching channels:', error.message);
		} else {
			channels = data;
			log.info("getChannels", "data: " + JSON.stringify(data));
		}
		log.exit("getChannels", "channels: " + JSON.stringify(channels));
		return channels;
};

export async function getUserBundle(user, what) {
	log.enter("getUserBundle");
	let res = {};
	const promises = [];
	const tables = Object.keys(what);
	for (let i = 0; i < tables.length; ++i) {
		const tableName = tables[i];
		const query = what[tableName];
		new Promise((resolve, reject) => {
 			let { data, error } = supabase.from(tables[i]).eq(query);
			if (error) {
            			reject(error);
        		} else {
            			resolve(data);
			}
		});
        }
   	Promise.all(promises)
        	.then(values => {
			for (let i = 0; i < values.length; ++i) {
				res[ tables[i]] = values[i];
			}
        	})
        	.catch(error => {
            		console.error('One of the promises rejected:', error);
        	});
	log.exit("getUserBundle", "res: " + JSON.stringify(res));
	return res;
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
		return visits;
	})();
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
		return profile;
	})();
};


