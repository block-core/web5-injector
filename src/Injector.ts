import { Web5RequestProvider } from './types.js';
import { Web5 } from './Web5.js';

/** Web5 Injector that registers itself using globalThis */
export class Injector {
	/** Call upon loading to ensure that web5 is globally available and that
	 * the provider from the caller is registered and made available. */
	public static register(provider: Web5RequestProvider) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const global = globalThis as any;

		if (typeof global.web5 === 'undefined') {
			const web5 = new Web5();
			web5.addProvider(provider);
			global.web5 = web5;
		} else {
			// If the providers is not there, it's likely that the existing web5 object was not
			// provided by our web5-injector but a wallet. Let's attempt to merge existing with
			// the Web5.
			if (!global.web5.providers) {
				global.web5 = Object.assign(new Web5(), global.web5);
			}

			global.web5.addProvider(provider);
		}
	}
}
