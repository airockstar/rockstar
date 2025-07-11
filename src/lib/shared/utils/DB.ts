import { isBrowser } from "@supabase/ssr"
import { serverDatabaseDriver } from "@server/DB"
import { clientDatabaseDriver } from "@client/DB"
import { Database } from "@utils"

export const getDatabase = () => {
	if (isBrowser()) {
		return new Database(clientDatabaseDriver);
	} else {
		return new Database(serverDatabaseDriver);
	}
}
