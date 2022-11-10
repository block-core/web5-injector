import { Web5RequestProvider } from './types.js';
import { Web5 } from './Web5.js';

/** Web5 Injector that registers itself using globalThis */
export class Injector {
	/** Call upon loading to ensure that web5 is globally available and that
	 * the provider from the caller is registered and made available. */
	public static register(provider: Web5RequestProvider) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const global = globalThis as any;

		if (typeof global !== 'undefined' && typeof global.web5 === 'undefined') {
			const web5 = new Web5();
			web5.addProvider(provider);
			global.web5 = web5;
		} else {
			global.web5.addProvider(provider);
		}
	}
}
