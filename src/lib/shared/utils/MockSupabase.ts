
import { getLogger } from "@utils/logger"
const log = getLogger(import.meta.url);


const db = {
	channel: [
		{ role: "General", updated_on: Date.now(), snippet: "" },
		{ role: "Development", updated_on: Date.now(), snippet: "" },
		{ role: "Status", updated_on: Date.now(), snippet: "" },
	], 
	agent: [
		{ name: "Bob", role: "Developer", updated_on: Date.now(), snippet: ""},
		{ name: "Sue", role: "QA", updated_on: Date.now(), snippet: ""},
	],
	artifact: [
		{ role: "Database", updated_on: Date.now(), snippet: "" },
		{ role: "Codebase", updated_on: Date.now(), snippet: "" },
		{ role: "UI", updated_on: Date.now(), snippet: "" },
	], 
	user: [
		{ email: "mock@mock.com" }
	],
	profile: [
		{ name: "Mike", email: "mike@rockstar.ai", roles: ["Developer","QA"] }
	]
};

export function MockSupabase() {
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
		if (typeof name == "obect") {
			let key = Object.keys(name);
			value = name[key];
			name = key;
		}
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
	this.auth = {
		getUser: () => {
			return { data: { user: db.user[0] } };
		}
	}
}
