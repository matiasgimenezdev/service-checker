interface CheckServiceUseCase {
	execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
	private readonly successCallback: SuccessCallback;
	private readonly errorCallback: ErrorCallback;

	constructor(
		successCallback: SuccessCallback,
		errorCallback: ErrorCallback
	) {
		this.errorCallback = errorCallback;
		this.successCallback = successCallback;
	}

	public async execute(url: string): Promise<boolean> {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Service ${url} is down`);
			}

			this.successCallback();
			return true;
		} catch (error) {
			this.errorCallback(`${error}`);
			return false;
		}
	}
}
