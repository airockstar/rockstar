
import { getLogger } from "@utils/logger"
const log = getLogger(import.meta.url);

export function createMockDatabaseClient() {
	return new RMockClient();
}

const db = {
	channel: [
		{ name: "General", updated_on: Date.now() },
		{ name: "Development", updated_on: Date.now() },
		{ name: "Status", updated_on: Date.now() },
	], 
	agent: [
		{ name: "Bob", role: "Developer", updated_on: Date.now()},
		{ name: "Sue", role: "QA", updated_on: Date.now()},
	],
	user: [
		{ email: "mock@mock.com" }
	],
	profile: [
		{ name: "Mike", email: "mike@rockstar.ai", roles: ["Developer","QA"] }
	]
};

function RMockClient() {
	let data = [];
	let error = null;
	this.from = (tableName) => {
		log.enter("from", tableName);
		data = db[tableName] || [];
		return this._getReturn();
	}
	this.select = (fields) => {
		let res = [];
		if (fields && fields != "*") {
			if (typeof fields == "string") {
				fields = fields.replaceAll(" ", "").split(",");
			}
			for (let i = 0; i < this.data.length; ++i) {
				let d = {};
				for (let j = 0; j < fields.length; ++j) {
					d[fields[j]] = this.data[i][fields[j]];
				}
				res.push(d);
			}
			data = res;
		}
		return this._getReturn();
	}
	this.eq = (name, value) => {
		let res = [];
		for (let i = 0; i < data.length; ++i) {
			if (data[i][name] == value) {
				res.push(data[i]);
			}
		}
		data = res;
		return this._getReturn();
	}
	this.single = () => {
		data = data[1];
		return this._getReturn();
	}
	this.auth = {
		getUser: (id) => { return { data: db.user[0] , error: null } }
	}
	this._getReturn = () => {
		let ret = { data, error };
		ret.from = this.from;
		ret.eq = this.eq;
		ret.select = this.select;
		ret.single = this.single;
		log.exit("returning", JSON.stringify(ret));
		return ret;
	}
}
