
import type { User, Status } from "$lib/types";
import { getLogger } from "@utils/logger"
import { getDatabase } from "@utils/DB"
const log = getLogger(import.meta.url);
const db = getDatabase();


export class Visit {
	async function list(user, what) {
		log.enter("list");
		let visits = {};
		const { data, error } = await db.query('visited').eq({ user_id: user.id });
        if (error) {
			log.error('list', 'Error fetching visits:', error.message);
		} else {
			visits = data;
		}
		log.exit("list");
		return visits;
	}
};

