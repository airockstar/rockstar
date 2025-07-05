

class RPersona {
	this.table_name = "Persona";
	static create(name, prompt) {
		await RDatabase.assertUniqueness(this.table_name, "name", name);
		const p = new RPersona(name);
		return p;
	}
	
	
