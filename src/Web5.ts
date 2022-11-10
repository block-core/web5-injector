import { Web5RequestProvider } from './types.js';

/** Web5 is registered and made available globally through globalThis.web5. */
export class Web5 {
	#providers: Web5RequestProvider[] = [];

	/** Get the current active provider. */
	currentProvider?: Web5RequestProvider;

	/** Get all registered providers. */
	get providers() {
		return this.#providers;
	}

	/** Adds an request provider, multiple with same name can be added. */
	addProvider(provider: Web5RequestProvider) {
		this.#providers.push(provider);
	}

	/** Get a provider based upon the name. */
	getProvider(name: string) {
		return this.#providers.find((p) => p.name == name);
	}
}
