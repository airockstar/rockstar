
import type { User, Status } from "$lib/types";
import { getLogger } from "@utils/logger"
import { getDatabase } from "@utils/Services"
const log = getLogger(import.meta.url);
const db = getDatabase();


/**
 supabase-js requires eq to be after select
**/
export class Enterprise {
	async getBundle(user, what) {
		log.enter("getBundle");
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
 				let query = db.query(tables[i]);
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
           	log.error('getBundle', 'One of the promises rejected:', error);
		res = {};
        }
	log.exit("getBundle", "res: " + JSON.stringify(res));
	return res;
	}
};
