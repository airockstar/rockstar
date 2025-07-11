
import type { User, Status } from "$lib/types";
import { getLogger } from "@utils/logger"
import { getDatabase } from "@utils/DB"
const log = getLogger(import.meta.url);
const db = getDatabase();


export class Profile {
	async function getProfile(user) {
		let profile = null;
		const { data, error } = await db.query('profile').eq({ user_id: user.id });
        if (error) {
			console.error('Error fetching profile:', error.message);
		} else {
			profile = data;
		}
		return profile;
	}
};

