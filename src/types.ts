export interface RequestArguments {
	readonly method: string;
	readonly params?: readonly unknown[] | object;
}

export interface Web5RequestProvider {
	name: string;

	request(args: RequestArguments): Promise<unknown>;
}
