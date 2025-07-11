
import type { User, Status } from "$lib/types";
import { getLogger } from "@utils/logger"
import { getDatabase } from "@utils/DB"
const log = getLogger(import.meta.url);
const db = getDatabase();


/**
 supabase-js requires eq to be after select
**/

export class Channel {
	async function list(user, what) {
		log.enter("list");
		let channels = [];
		const { data, error } = await db.query('channel').select('*');
        if (error) {
			log.error('Error fetching channels:', error.message);
		} else {
			channels = data;
			log.info("list", "data: " + JSON.stringify(data));
		}
		log.exit("list", "channels: " + JSON.stringify(channels));
		return channels;
	}
};
