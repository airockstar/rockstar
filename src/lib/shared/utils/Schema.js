
export const Schema = { schema: {
	agent: {
		columns: [
			{ name: "uuid", type: "text", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "name", type: "text", maxlength: 80, unique: true, index: true },
			{ name: "status", type: "string", maxlength: 40, "enum": ["idle", "alert", "working", "question"] },
			{ name: "personality", type: "reference", table: "personality" },
			{ name: "skill", type: "reference", table: "skill" },
			{ name: "goal", type: "reference", table: "goal" },
			{ name: "learning", type: "reference", table: "context" },
			{ name: "rules", type: "reference", table: "context" },
			{ name: "activated", type: "boolean", "default": false },
			{ name: "LLM", type: "reference", table: "LLM" },
			{ name: "allowance", type: "reference",  table: "allowance" },
			{ name: "assigned_to", type: "reference",  table: "enterprise" },
			{ name: "owner", type: "reference",  table: "organization" },
			{ name: "context", type: "reference", table: "context" },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
		]
	},
	persona: {
		columns: [
			{ name: "uuid", type: "text", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "owner", type: "reference", table: "organization" },
			{ name: "context", type: "text",  maxlength: 100000 },
			{ name: "updated_by", type: "reference", table: "user" },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
		]
	},
	role: {
		columns: [
			{ name: "uuid", type: "string", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "name", type: "string", maxlength: 80, unique: true, index: true },
			{ name: "description", type: "text",  maxlength: 4096 },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
		]
	},
	roleM2M: {
		columns: [
			{ name: "uuid", type: "string", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "role", type: "reference", table: "role" },
			{ name: "subject_uuid", type: "string", maxlength: 40 },
			{ name: "user_or_agent_uuid", type: "string", maxlength: 40 },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
		]
	},
	goal: {
		columns: [
			{ name: "uuid", type: "text", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "context", type: "text",  maxlength: 1048576 },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
			{ name: "created_by", type: "reference", table: "user" },
			{ name: "updated_by", type: "reference", table: "user" },
		]
	},
	skill: {
		columns: [
			{ name: "uuid", type: "text", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "context", type: "text",  maxlength: 1048576 },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
			{ name: "created_by", type: "reference", table: "user" },
			{ name: "updated_by", type: "reference", table: "user" },
		]
	},
	context: {
		columns: [
			{ name: "uuid", type: "text", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "owner", type: "reference", table: "organization" },
			{ name: "content", type: "text",  maxlength: 100000 },
			{ name: "created_by", type: "reference", table: "user" },
			{ name: "updated_by", type: "reference", table: "user" },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
		]
	},
	profile: {
		columns: [
			{ name: "uuid", type: "string", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "name", type: "string", maxlength: 80, unique: true, index: true },
			{ name: "website", type: "string", maxlength: 1024 },
			{ name: "email", type: "string", maxlength: 1024, notnull: true },
			{ name: "description", type: "text",  maxlength: 4096 },
			{ name: "theme", type: "string",  maxlength: 40 },
			{ name: "owner", type: "string",  table: "user", notnull: true },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
			{ name: "created_by", type: "reference", table: "user" },
			{ name: "updated_by", type: "reference", table: "user" },
		]
	},
	organization: {
		columns: [
			{ name: "uuid", type: "string", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "name", type: "string", maxlength: 80, unique: true, index: true },
			{ name: "description", type: "text",  maxlength: 4096 },
			{ name: "owner", type: "string",  table: "user" },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
		]
	},
	history: {
		columns: [
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "source_table", type: "text",  maxlength: 40, index: true },
			{ name: "source_uuid", type: "text",  maxlength: 40, index: true },
			{ name: "content", type: "text",  maxlength: 100000 },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
		]
	},
	collaboration: {
		columns: [
			{ name: "uuid", type: "text", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "name", type: "string", maxlength: 80, unique: true, index: true },
			{ name: "agentA", type: "reference",  table: "agent" },
			{ name: "agentB", type: "reference",  table: "agent" },
			{ name: "agentC", type: "reference",  table: "agent" },
			{ name: "pattern", type: "reference", table: "collaboration_pattern" },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
			{ name: "created_by", type: "reference", table: "user" }, // entity?
			{ name: "updated_by", type: "reference", table: "user" }, // entity?
		]
	},
	collaboration_pattern: {
		columns: [
			{ name: "uuid", type: "text", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "name", type: "string", maxlength: 80, unique: true, index: true },
			{ name: "agentAContext", type: "text",  maxlength: 100000 },
			{ name: "agentBContext", type: "text",  maxlength: 100000 },
			{ name: "agentCContext", type: "text",  maxlength: 100000 },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
			{ name: "created_by", type: "reference", table: "user" }, // entity?
			{ name: "updated_by", type: "reference", table: "user" }, // entity?
		]
	},
	visit: {
		columns: [
			{ name: "uuid", type: "text", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "subject", type: "string", maxlength: 40, index: true },
			{ name: "subjectTablename", type: "string", maxlength: 40, index: true },
			{ name: "user", type: "reference",  table: "user" },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
			{ name: "created_by", type: "reference", table: "user" }, // entity?
			{ name: "updated_by", type: "reference", table: "user" }, // entity?
		]
	},
	artifact: {
		columns: [
			{ name: "uuid", type: "text", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "kind", type: "string", maxlength: 80, index: true },
			{ name: "name", type: "string", maxlength: 1024 },
			{ name: "owner", type: "reference",  table: "organization" },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
			{ name: "created_by", type: "reference", table: "organization" }, 
			{ name: "updated_by", type: "reference", table: "organization" },
		]
	},	
	history: {
		columns: [
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "kind", type: "string", "enum": ["create", "update", "delete", "response", "question", "command" },
			{ name: "agent", type: "reference",  table: "agent" },
			{ name: "user", type: "reference",  table: "user" },
			{ name: "location_uuid", type: "string",  maxlength: 40 },
			{ name: "location_table", type: "string",  maxlength: 40, "enum": [ "channel", "DM", "artifact" ] },
			{ name: "content", type: "string",  maxlength: "1048576" },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
			{ name: "created_by", type: "reference", table: "actor" }, 
			{ name: "updated_by", type: "reference", table: "actor" },
		]
	},	
	enterprise: {
		columns: [
			{ name: "uuid", type: "text", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "name", type: "string", maxlength: 1024 },
			{ name: "owner", type: "reference",  table: "organization" },
			{ name: "operator", type: "reference",  table: "user" },
			{ name: "description", type: "text",  maxlength: 4096 },
			{ name: "mission", type: "reference",  table: "spec" },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
			{ name: "created_by", type: "reference", table: "organization" }, 
			{ name: "updated_by", type: "reference", table: "organization" },
		]
	},	
	channel: {
		columns: [
			{ name: "uuid", type: "text", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "name", type: "string", maxlength: 40 },
			{ name: "description", type: "text",  maxlength: 4096 },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
			{ name: "created_by", type: "reference", table: "organization" }, 
			{ name: "updated_by", type: "reference", table: "organization" },
		]
	},	
	LLM: {
		columns: [
			{ name: "uuid", type: "text", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "name", type: "string", maxlength: 40 },
			{ name: "description", type: "text",  maxlength: 4096 },
			{ name: "allowance", type: "reference",  table: "allowance" },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
			{ name: "created_by", type: "reference", table: "organization" }, 
			{ name: "updated_by", type: "reference", table: "organization" },
		]
	},
	allowance: {
		columns: [
			{ name: "uuid", type: "text", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "name", type: "string", maxlength: 40 },
			{ name: "token_request_limit", type: "integer",  "default": 4096 },
			{ name: "token_daily_limit", type: "integer",  "default": 0 },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
			{ name: "created_by", type: "reference", table: "organization" }, 
			{ name: "updated_by", type: "reference", table: "organization" },
		]
	},	
	spec: {
		columns: [
			{ name: "uuid", type: "text", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "name", type: "string", maxlength: 40 },
			{ name: "description", type: "text",  maxlength: 1048576 },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
			{ name: "created_by", type: "reference", table: "organization" }, 
			{ name: "updated_by", type: "reference", table: "organization" },
		]
	},	
	usecase: {
		columns: [
			{ name: "uuid", type: "text", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "name", type: "string", maxlength: 40 },
			{ name: "tag", type: "string", maxlength: 40 },
			{ name: "description", type: "text",  maxlength: 1048576 },
			{ name: "created_at", type: "integer" },
			{ name: "updated_at", type: "integer" },
			{ name: "created_by", type: "reference", table: "organization" }, 
			{ name: "updated_by", type: "reference", table: "organization" },
		]
	},	

}}

// prd, dependency graph, artifacts, channels, hashtags for skillsets, etc. defauls, artifact kinds: "webbsite" db, etc. Production/Skunkwork/Organization/enterprise/Performance (other meetings)/Collaboration, mission/goals, agent pool, activated vs on the bench, status, task < goal < mission, team & team dynamics - they want to work for YOU
	// agent.allowance	reference
	// agent.model reference	
	// not null
	// defaults
	// agent is active for a particular enterprise
	// agent have customizatons by owner
	// agent "bob" is has an owner and is assigned to an enterprise where is has a unique goal and context
	// user-supplied customizations in overrides/personalizations/customizations/instructions/rules, 
	// learning in learnings derrived from history and oberservations and other agents, 
	// goals in this enterprise + history
/*
	agent has parent?
	dna is in persona
	
*/

