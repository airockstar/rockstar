
import type { User, Status } from "$lib/types";
import { getLogger } from "@utils/logger"
import { getDatabase } from "@utils/DB"
const log = getLogger(import.meta.url);
const db = getDatabase();

/**
 supabase-js requires eq to be after select
**/

export class User {
	async function get(user) {
		log.enter("get");
		const { data, error } = await db.query('user').select('*').eq("id", user.user_id);
        if (error) {
			log.error('Error fetching user:', error.message);
			data = {};
		} else {
			log.info("get", "data: " + JSON.stringify(data));
		}
		log.exit("get", "user: " + JSON.stringify(data));
		return data;
	}
};
