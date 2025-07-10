

const TABLENAME = "Agent";

import Anthropic from '@anthropic-ai/sdk';
class RAgent {
	static agents = {};
	static create(ctx, name, persona, roles, description) {
		ctx.enter("RAgent.create", ...args);
		if (!RAssert.uniqueTableColumn(TABLENAME, "name", name)) {
			ctx.exitError("RAgent.create", "Duplicate name '" + name + "'");
			return null;
		}
		const agent = new RAgent(ctx, name, persona, roles, description);
		ctx.exit("RAgent.create", agent);
		return agent;
	}
	static get(ctx, guid) {
		if (!agents[guid]) {
			const data = RDatabase.query(TABLENAME, { guid });
			const agent = new RAgent(ctx, data.name, data.persona, data.roles, data.description, guid);
			agents[guid] = agent;
		}
		return agents[guid];
	}
	constructor(ctx, name, persona, roles, description, guid) {
		this.name = name;
		this.persona = persona;
		this.roles = roles;
		this.description = description;
		this.guid = guid || RUtil.generateGUID(TABLENAME);
		RDatabase.create(ctx, TABLENAME, { name, persona, roles, description, this.guid });
	}
	update(ctx) {
		RDatabase.update(ctx, TABLENAME, { this.name, this.persona, this.roles, this.description, this.guid }
	}
	setRoles(ctx, roles) {
		this.roles = roles;
		this.update(ctx);
	}
	execute(ctx, mission) {
		const prefs = RPreferences.getForAgent(ctx, this.guid, mission);
		switch (prefs.model) {

const anthropic = new Anthropic({
  apiKey: 'my_api_key', // defaults to process.env["ANTHROPIC_API_KEY"]
});

const msg = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, Claude" }],
});
console.log(msg);


		}
	}
}

class RTeam {
	static teams = {};
	static import(ctx, filename) {
		const file = RFileSystem.read(filename);
		const json = JSON.parse(file);
		
	}
	static create(ctx, name, description, agents) {
		ctx.enter("RTeam.create", ...args);
		if (!RAssert.uniqueTableColumn(TABLENAME, "name", name)) {
			ctx.exitError("RTeam.create", "Duplicate name '" + name + "'");
			return null;
		}
		const team = new RTeam(ctx, name, description, agents);
		ctx.exit("RTeam.create", team);
		return team;
	}
	static get(ctx, guid) {
		if (!teams[guid]) {
			const data = RDatabase.query(TABLENAME, { guid });
			const m2m = RDatabase.query(AGENT_TEAM_M2M_TABLENAME, { team_guid, guid });
			const agents = [];
			for (let i = 0; i < m2m.length; ++i) {
				agents.push(m2m[i].agent_guid);
			}
			const team = new RTeam(ctx, data.name, data.description, agents, guid);
			teams[guid] = team;
		}
		return teams[guid];
	}
	constructor(ctx, name, description, agents, guid) {
		this.name = name;
		this.description = description;
		this.agents = agents;
		this.guid = guid || RUtil.generateGUID(TABLENAME);
		RDatabase.create(TABLENAME, { name, persona, roles, this.guid });
	}
}
	
	
