
import { Schema } from "./Schema.js";
import { nanoid } from 'nanoid';

//    const { data, error } = await supabase.from('instruments').update({ name: 'piano' }).eq('id', 1).select()
//    const { error } = await supabase.from('instruments').update({ name: 'piano' }).eq('id', 1)
// https://github.com/supabase/postgrest-js
// https://docs.postgrest.org/en/v13/
// https://github.com/PostgREST/postgrest?tab=readme-ov-file
// https://pihhbrhdrwfpbnmsmlix.supabase.co

export class SupabaseDatabase {
	supabase = null;
	constructor(imp) {
		this.supabase = imp;
	}
		
	create(data) {
		const tableName = data.tableName;
		const schema = Schema[tableName];
		const props = Object.keys(data);
		const payload = {};
		payload.uuid = nanoid();
		for (let i = 0; i < props.length; ++i) {
			let prop = props[i];
			if (schema.columns[prop]) {
				payload[prop] = data[prop];
			}
		}
		return this._insert(tableName, payload);
	}
		
	update(data) {
		const tableName = data.tableName;
		const schema = Schema[tableName];
		const props = Object.keys(data);
		const payload = {};
		for (let i = 0; i < props.length; ++i) {
			let prop = props[i];
			if (schema.columns[prop]) {
				payload[prop] = data[prop];
			}
		}
		return this._update(tableName, payload);
	}

	/**
		@param filters: [filter, field, value]
			like('name', '%Lu%')
			ilike('name', '%Lu%') // case insensitive
			eq('id', 2)
			lte('id', 2)
			neq('name', 'Leia')
			in('name', ['Leia', 'Han'])
			is('name', null)
			contains('tags', ['is:open', 'priority:low']) // if column (tags) is an array
			containedBy('days', ['monday', 'tuesday', 'wednesday', 'friday'])
			rangeGt('during', '[2000-01-02 08:00, 2000-01-02 09:00)')
			rangeAdjacent('during', '[2000-01-01 12:00, 2000-01-01 13:00)')
			overlaps('tags', ['is:closed', 'severity:high'])
			.textSearch("content", `'eggs' & 'ham'`, { config: "english", })
			match({ id: 2, name: 'Leia' }) // multiple eqs
			not('name', 'is', null)
			not('id', 'in', '(5,6,7)')
			or('id.eq.2,name.eq.Han')
			filter('name', 'in', '("Han","Yoda")')
			filter('id', 'in', '(5,6,7)')
			filter('arraycol', 'cs', '{"a","b"}')  // Use `cs` for `contains()`, `{}` for array values
			order('id', { ascending: false })

		@param select :
  			.select('id, name')
			range(0, 1)

		@param limit :
			maybeSingle - return 0 or 1
			limit
			single // limit 1 returrns array, single returns record combine them if needed
			explain({analyze:true,verbose:true})
		@return Promise
	**/
	read(tableName, select, filters, limit) {
		const query = this.supabase.from(tableName).select(select);
		for (let i = 0; i < filters && filters.length; ++i) {
			let f = filters[i];
			if (Array.isArray(f)) {
				let op = f.unshift();
				query = query[op](...op);
			}
		}
		if (limit) {
			query = query[limit];
		}
		return query();
	}

	/**
		Caller calls the select, filters, and limits as needed
		@return Promise
	*/
	query(tableName) {
		return this.supabase.from(tableName);
	}
		
/*
const { data, error } = await supabase
  .from('very_big_table')
  .select()
  .abortSignal(AbortSignal.timeout(1000)) // ms 
const ac = new AbortController()
ac.abort()
const { data, error } = await supabase
  .from('very_big_table')
  .select()
  .abortSignal(ac.signal)
			
			
	*/

	async _insert(tableName, payload) {
		const { data, error } = await this.supabase.from(tableName).insert(payload).select();
		return { data, error };
	}

	async _update(tableName, payload) {
		const { data, error } = await this.supabase.from(tableName).update(payload).eq('id', payload.id).select();
		return { data, error };
	}
	async _upsert(tableName, payload) {
		const { data, error } = await this.supabase.from(tableName).upsert(payload).select();
		return { data, error };
	}
	async _upsertBatch(tableName, payloadArray) {
		const { data, error } = await this.supabase.from(tableName).upsert(payloadArray);
		return { data, error };
	}
	async _delete(tableName, payload) {
		const { data, error } = await this.supabase.from(tableName)["delete"].eq('id', payload.id).select();
		return { data, error };
	}
	subscribe(tableName, listener) {
		const userListener = this.supabase.channel('public:user').on('postgres_changes', { event: '*', schema: 'public', table: tableName }, (payload) => listener(payload));
		return userListener
	}
	unsubscribe(userListener) {
		this.supabase.removeChannel(userListener);
	}
}


				
		
