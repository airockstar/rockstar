import { createClient } from '@supabase/supabase-js';
import type { User, Status } from "$lib/types";
import { get, writable } from "svelte/store";
import { supabase } from '$lib/supabaseClient';

export const userStore = writable<Status>(null, (set) => {
	(async () => {
		const { data: { user }, error } = await supabase.auth.getUser();
		if (error) {
			console.error('Error fetching user:', error);
			return null;
		}
		set(user);
	})();
});

export const statusStore = writable<Status>(null, (set) => {
	(async () => {
		const { data: { user }, userError } = await supabase.auth.getUser();
        	if (userError || !user) {
			console.error('Error fetching user:', userError ? userError.message : "Not Found");
		} else {
			const { data, error } = await supabase
				.from('Status') 
				.select('*')
				.eq('user_id', user.id) 
				.single(); 
        		if (error) {
				console.error('Error fetching userStatus record:', error.message);
			} else {
				set(data);
			}
		}
		
	})();
});

export const userLastVisitedStore = writable<Status>(null, (set) => {
	(async () => {
		const { data: { user }, userError } = await supabase.auth.getUser();
        	if (userError || !user) {
			console.error('Error fetching user:', userError ? userError.message : "Not Found");
		} else {
			const { data, error } = await supabase
				.from('Visited') 
				.select('*')
				.eq('user_id', user.id) ;
        		if (error) {
				console.error('Error fetching userLastVisitedStore record:', error.message);
			} else {
				set(data);
			}
		}
		
	})();
});
