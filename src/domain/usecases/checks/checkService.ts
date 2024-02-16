interface CheckServiceUseCase {
	execute(url: string): Promise<boolean>;
}

export class CheckService implements CheckServiceUseCase {
	public async execute(url: string): Promise<boolean> {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Service ${url} is down`);
			}

			console.log(`Service ${url} is up!`);
			return true;
		} catch (error) {
			console.log(`${error}`);
			return false;
		}
	}
}
