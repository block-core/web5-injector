import { Injector, RequestArguments, Web5, Web5RequestProvider } from '../src/index.js';
import test from 'ava';

class MyWalletProvider implements Web5RequestProvider {
	name = 'mywalletprovider';

	async request(args: RequestArguments): Promise<unknown> {
		if (args.method) {
			return 'ok';
		} else {
			return null;
		}
	}
}

test('Create a provider and register globally', async (t) => {
	const provider = new MyWalletProvider();
	Injector.register(provider);

	const web5 = globalThis.web5 as Web5;

	t.assert(web5 != null);
	t.assert(web5.providers.length == 1);

	Injector.register(new MyWalletProvider());
	t.assert(web5.providers.length == 2);

	// The injector never auto-sets the current, that is up to wallet developers to handle.
	t.assert(web5.currentProvider == null);

	// Different examples on how to set the current provider, which should be done by wallets.
	web5.currentProvider = provider;
	web5.currentProvider = web5.getProvider('mywalletprovider');
	web5.currentProvider = web5.providers[0];

	t.assert(web5.currentProvider != null);
	t.assert(web5.currentProvider.name == 'mywalletprovider');

	const args: RequestArguments = {
		method: 'did.authn',
		params: [{}],
	};

	const result = await web5.currentProvider.request(args);
	t.assert(result != null);

	// A normal app developer that want to utilize Web5 APIs, should get an helper library
	// that implements functions that wraps the generic request API.
	// Potential example:

	// const web5 = new Web5Provider(globalThis.web5.currentProvider);
	// web5.did.authn();
	// web5.did.request();
	// web5.did.supportedMethods();
	// web5.vc.apply();
	// web5.vc.deliver();
	// web5.vc.request();
});
