

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
		{ name: "Bob", roles: ["Developer", "QA" ] }
	]
};

function RMockClient() {
	this.data = [];
	this.error = null;
	this.from = (tableName) => {
		this.data = db[tableName] || [];
		return this;
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
			this.data = res;
		}
		return this;
	}
	this.eq = (name, value) => {
		let res = [];
		for (let i = 0; i < this.data.length; ++i) {
			if (this.data[i][name] == value) {
				res.push(this.data[i]);
			}
		}
		this.data = res;
		return this;
	}
	this.single = () => {
		this.data = this.data[1];
		return this;
	}
	this.auth = {
		getUser: (id) => { return { data: db.user[0] , error: null } }
	}
}
