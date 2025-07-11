
{ schema: {
	agent: {
		columns: [
			{ name: "uuid", type: "text", maxlength: 40, unique: true, index: true },
			{ name: "id", type: "integer", unique: true, index: true, autoincrement: true },
			{ name: "name", type: "text", maxlength: 80, unique: true, index: true },
			{ name: "status", type: "string", maxlength: 40, enum: ["idle", "alert", "working", "question"] },
			{ name: "personality", type: "reference", table: "personality" },
			{ name: "skill", type: "reference", table: "skill" },
			{ name: "goal", type: "reference", table: "goal" },
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
			{ name: "agent", type: "reference", table: "agent" },
			{ name: "context", type: "text",  maxlength: 1000000 },
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
			{ name: "agent", type: "reference", table: "agent" },
			{ name: "context", type: "text",  maxlength: 1000000 },
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
			{ name: "uuid", type: "text", maxlength: 40, unique: true, index: true },
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
	}

}}

// prd, dependency graph, artifacts, channels, hashtags for skillsets, etc. defauls, artifact kinds: "webbsite" db, etc. Production/Skunkwork/Organization/enterprise/Performance (other meetings)/Collaboration, mission/goals, agent pool, activated vs on the bench, status, task < goal < mission, team & team dynamics - they want to work for YOU
	// agent.allowance	reference
	// agent.model reference	
	// not null
	// defaults

