
import { createClient } from '@supabase/supabase-js';
import type { User, Status } from "$lib/types";
import { get, writable } from "svelte/store";
import { supabase } from '$lib/supabaseClient';
import { getLogger } from "@utils/logger"
const log = getLogger(import.meta.url);


/**
 supabase-js requires eq to be after select
**/
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
	
	let str = "";
	for (let i = 0; i < tables.length; ++i) {
		const tableName = tables[i];
		str += "db.from(" + tableName + ")";
		if (what[tableName].select) {
			str += ".select(" + what[tableName].select + ")";
		}
		if (what[tableName].eq) {
			str += ".eq(" + JSON.stringify(what[tableName].eq) + ")";
		}
	}
	log.info("getUserBundle: query=" + str);
	
	for (let i = 0; i < tables.length; ++i) {
		const tableName = tables[i];
		const filter = what[tableName];
		promises.push(new Promise((resolve, reject) => {
 			let query = supabase.from(tables[i]);
			if (filter.select && !query.error) {
 				query = query.select(filter.select);
			}
			if (filter.eq && !query.error) {
 				query = query.eq(filter.eq);
			}
			if (query.error) {
            			reject(query.error);
        		} else {
log.info("getUserBundle data=" + tables[i] + "," + JSON.stringify(query.data))
            			resolve(query.data);
			}
		}));
        }
	try {
   		const values = await Promise.all(promises)
log.info("promised THENNNNNNNNNNNNNNNNNNNNNNN values.length=" + values.length);
		for (let i = 0; i < values.length; ++i) {
log.info("promised value = " + JSON.stringify(values[i]));
			res[tables[i]] = values[i];
		}
       	} catch(error) {
           	log.error('One of the promises rejected:', error);
		res = {};
        }
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


